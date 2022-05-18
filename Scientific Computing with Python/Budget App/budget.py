class Category:
  def __init__(self, name):
    self.ledger = []
    self.name = name

  def __str__(self):
    star_half_length = (30 - len(self.name)) // 2
    result = '*' * star_half_length + self.name + '*' * star_half_length + '\n'
    for item in self.ledger:
      if(len(item['description']) > 23):
        result += item['description'][0:23]
      else:
        result += item['description'] + ' ' * (23 - len(item['description']))
      result += ' ' * (7 - len(f'{item["amount"]:.2f}')) + f'{item["amount"]:.2f}\n'
    result += 'Total: ' + str(self.get_balance())
    return result
    
  def deposit(self, amount, desc=''):
    budget_object = {
      'amount': amount,
      'description': desc
    }
    self.ledger.append(budget_object)
  
  def withdraw(self, amount, desc=''):
    if(not self.check_funds(amount)):
      return False
    budget_object = {
      'amount': -amount,
      'description': desc
    }
    self.ledger.append(budget_object)
    return True

  def get_balance(self):
    return sum([budget_object['amount'] for budget_object in self.ledger])
    
  def transfer(self, amount, other_category):
    if(not self.check_funds(amount)):
      return False
    self.withdraw(amount, f'Transfer to {other_category.name}')
    other_category.deposit(amount, f'Transfer from {self.name}')
    return True

  def check_funds(self, amount):
    return amount <= self.get_balance()


def create_spend_chart(categories):
    result = 'Percentage spent by category\n'
    category_ledger = [category.ledger for category in categories]
    category_spending = [round(-sum([item['amount'] for item in ledger if item['amount'] < 0])) for ledger in category_ledger]
    total_spending = sum(category_spending)
    category_percentage = [(category_spend * 10 // total_spending) for category_spend in category_spending]
    for i in range(10, -1, -1):
        result += '' if i == 10 else '  ' if i == 0 else ' '
        result += f'{i * 10}|'
        for j, category in enumerate(categories):
            result += ' o ' if category_percentage[j] >= i else '   '
        result += ' \n'
    result += ' ' * 4 + '-' * (len(categories) * 3 + 1) + '\n    '
    category_names = [category.name for category in categories]
    for i in range(len(max(category_names, key=len))):
        for category in category_names:
            try:
                result += f' {category[i]} '
            except:
                result += '   '
        result += ' \n    ' if i < len(max(category_names, key=len)) - 1 else ' '
    return result