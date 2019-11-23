def apply_map(functions, items):
    """ Applys an array of functions to an array of elements

        - @type functions:  arrray
        - @param functions: array of functions to apply
        - @type items:      array
        - @param items:     array of items to apply functions to
        - @rtype items:     array
        - @return           array of items with functions applied
    """
    for function in functions:
        items = [function(item) for item in items]
    return items
