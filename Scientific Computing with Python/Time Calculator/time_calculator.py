def add_time(start, duration, day=None):
    start_arr = start.split(':')
    duration_arr = duration.split(':')
    start_min_split = start_arr[1].split(' ')
    am_pm = 0 if start_min_split[1] == 'AM' else 12
    start_min = (int(start_arr[0]) + am_pm) * 60 + int(start_min_split[0])
    duration_min = int(duration_arr[0]) * 60 + int(duration_arr[1])
    result_min = start_min + duration_min
    result_day = result_min // (60 * 24)
    result_hour = (result_min % (60 * 24)) // 60
    result_am_pm = 'AM' if result_hour < 12 else 'PM'
    result_hour = result_hour if result_hour <= 12 else result_hour - 12
    result_hour = 12 if result_hour == 0 else result_hour
    result_min = (result_min % 60) if result_min % 60 >= 10 else f'0{result_min % 60}'
    new_time = f'{result_hour}:{result_min} {result_am_pm}'
    if day is not None:
        day_map = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
        new_time += f', {day_map[(day_map.index(day.lower()) + result_day) % 7].title()}'
    if(result_day == 1):
        new_time += f' (next day)'
    elif(result_day > 0):
        new_time += f' ({result_day} days later)'
    return new_time