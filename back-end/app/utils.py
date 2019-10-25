def apply_map(functions, items):
    """Applys an array of functions to an array of elements"""
    for function in functions:
        items = [function(item) for item in items]
    return items
