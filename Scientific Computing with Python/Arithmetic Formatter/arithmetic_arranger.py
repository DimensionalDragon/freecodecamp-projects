def operation(tokens):
    if tokens[1] == '+':
        return int(tokens[0]) + int(tokens[2])
    elif(tokens[1] == '-'):
        return int(tokens[0]) - int(tokens[2])
    else:
        return 'Error: Operator must be \'+\' or \'-\'.'
    
def arithmetic_arranger(problems, display_answer=False):
    if len(problems) > 5:
        return 'Error: Too many problems.'
  
    arranged_problems = ['', '', '']
    if display_answer:
        arranged_problems.append('')
    for i, num_str in enumerate(problems):
        splitted = num_str.split()
        if len(splitted[0]) > 4 or len(splitted[2]) > 4:
            return 'Error: Numbers cannot be more than four digits.'
        if not splitted[0].isdigit() or not splitted[2].isdigit():
            return 'Error: Numbers must only contain digits.'
        if splitted[1] != '+' and splitted[1] != '-':
            return 'Error: Operator must be \'+\' or \'-\'.'
        width = max([len(token) for token in splitted]) + 2
        arranged_problems[0] += (' ' * (width - len(splitted[0])) + splitted[0])
        arranged_problems[1] += (splitted[1] + ' ' * (width - len(splitted[2]) - 1) + splitted[2])
        arranged_problems[2] += ('-' * width)
        if display_answer:
            answer = str(operation(splitted))
            arranged_problems[3] += (' ' * (width - len(answer)) + answer)
        for j, _ in enumerate(arranged_problems):
            if i != len(problems) - 1:
                arranged_problems[j] += ('    ')
      
    return '\n'.join(arranged_problems)