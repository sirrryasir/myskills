import os
import sys
import json
import argparse

LIBRARIES_ROOT = "/home/yasir/Dev/mcp/excalidraw-libraries"
LIBRARIES_JSON = os.path.join(LIBRARIES_ROOT, "libraries.json")

def load_libraries():
    if not os.path.exists(LIBRARIES_JSON):
        print(f"Error: {LIBRARIES_JSON} not found.")
        sys.exit(1)
    with open(LIBRARIES_JSON, 'r', encoding='utf-8') as f:
        return json.load(f)

def search(query):
    libs = load_libraries()
    query = query.lower()
    print(f"Searching for '{query}' in libraries...\n")
    found = False
    for lib in libs:
        name = lib.get('name', '')
        desc = lib.get('description', '')
        item_names = lib.get('itemNames', [])
        
        match = query in name.lower() or query in desc.lower() or any(query in item.lower() for item in item_names)
        if match:
            found = True
            print(f"Library: {name}")
            print(f"Source: {lib.get('source')}")
            print(f"Description: {desc}")
            if item_names:
                print(f"Items: {', '.join(item_names)}")
            print("-" * 40)
            
    if not found:
        print("No libraries found matching your query.")

def inspect(source):
    lib_path = os.path.join(LIBRARIES_ROOT, source)
    if not os.path.exists(lib_path):
        # try prepending 'libraries/'
        lib_path = os.path.join(LIBRARIES_ROOT, "libraries", source)
        if not os.path.exists(lib_path):
            print(f"Error: Could not find library file at {lib_path}")
            sys.exit(1)
            
    with open(lib_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
        
    library_items = data.get('library', [])
    if not library_items:
        library_items = data.get('libraryItems', [])
        
    print(f"Library {source} contains {len(library_items)} items.\n")
    
    for i, item in enumerate(library_items):
        # Try to guess item name from its text elements if any
        texts = []
        element_types = {}
        # item is usually an array of elements, or a dict with 'elements'
        elements = item.get('elements', []) if isinstance(item, dict) else item
        
        for el in elements:
            el_type = el.get('type')
            element_types[el_type] = element_types.get(el_type, 0) + 1
            if el_type == 'text' and el.get('text'):
                texts.append(el.get('text').replace('\n', ' '))
                
        elements_summary = ", ".join([f"{k}:{v}" for k,v in element_types.items()])
        name_hint = f" (Text: {', '.join(texts)})" if texts else ""
        print(f"Item {i}: {len(elements)} elements [{elements_summary}]{name_hint}")

def extract(source, index, target_x=0.0, target_y=0.0):
    lib_path = os.path.join(LIBRARIES_ROOT, source)
    if not os.path.exists(lib_path):
        lib_path = os.path.join(LIBRARIES_ROOT, "libraries", source)
        if not os.path.exists(lib_path):
            print(f"Error: Could not find library file at {lib_path}")
            sys.exit(1)
            
    with open(lib_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
        
    library_items = data.get('library', [])
    if not library_items:
        library_items = data.get('libraryItems', [])
        
    if index < 0 or index >= len(library_items):
        print(f"Error: Index {index} out of bounds. Library has {len(library_items)} items.")
        sys.exit(1)
        
    item = library_items[index]
    elements = item.get('elements', []) if isinstance(item, dict) else item
    
    # Calculate bounding box to center the item at target_x, target_y
    if not elements:
        print("[]")
        return
        
    min_x = min(el.get('x', 0) for el in elements)
    min_y = min(el.get('y', 0) for el in elements)
    
    offset_x = target_x - min_x
    offset_y = target_y - min_y
    
    import copy
    import random
    
    translated_elements = []
    # We should also update groupIds so they don't collide if imported multiple times
    group_id_map = {}
    
    for el in elements:
        new_el = copy.deepcopy(el)
        new_el['x'] = new_el.get('x', 0) + offset_x
        new_el['y'] = new_el.get('y', 0) + offset_y
        
        # Optionally regenerate IDs or group IDs to avoid collisions in the target diagram
        new_el['id'] = new_el.get('id', '') + f"_lib{index}_{random.randint(1000,9999)}"
        
        if 'groupIds' in new_el:
            new_group_ids = []
            for g in new_el['groupIds']:
                if g not in group_id_map:
                    group_id_map[g] = f"{g}_{random.randint(1000,9999)}"
                new_group_ids.append(group_id_map[g])
            new_el['groupIds'] = new_group_ids
            
        translated_elements.append(new_el)
        
    print(json.dumps(translated_elements, indent=2))

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description="Excalidraw Library Helper for AI Agents")
    subparsers = parser.add_subparsers(dest="command", required=True)
    
    # Search
    parser_search = subparsers.add_parser("search", help="Search available libraries")
    parser_search.add_argument("query", help="Search query")
    
    # Inspect
    parser_inspect = subparsers.add_parser("inspect", help="Inspect items inside a specific library")
    parser_inspect.add_argument("source", help="The source path of the library (e.g. g-script/android.excalidrawlib)")
    
    # Extract
    parser_extract = subparsers.add_parser("extract", help="Extract a specific item from a library as JSON elements")
    parser_extract.add_argument("source", help="The source path of the library")
    parser_extract.add_argument("index", type=int, help="The index of the item to extract")
    parser_extract.add_argument("--x", type=float, default=0.0, help="Target X coordinate")
    parser_extract.add_argument("--y", type=float, default=0.0, help="Target Y coordinate")
    
    args = parser.parse_args()
    
    if args.command == "search":
        search(args.query)
    elif args.command == "inspect":
        inspect(args.source)
    elif args.command == "extract":
        extract(args.source, args.index, args.x, args.y)
