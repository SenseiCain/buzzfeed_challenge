import requests
import json

result = []
users = []

repo_count = 0
print("Please enter the Github usernames you would like information on. Type 'done' if you are finished.")
while(repo_count < 10):
	user_input = input('user: ')

	if user_input == 'done':
		break
	else:
		users.append(user_input)

	repo_count+=1


for user in users:
	url = f'https://api.github.com/users/{user}/repos'
	resp = requests.get(url)

	if resp.status_code == 200:
		user_obj = {}
		user_obj['name'] = user
		user_obj['languages'] = {}
		
		for repo in resp.json():
			language = repo['language']

			if language not in user_obj['languages'].keys():
				if language != None:
					user_obj['languages'][language] = 1
			else:
				user_obj['languages'][language] += 1

		result.append(user_obj)
	user_obj['count'] = len(set(user_obj['languages'].keys()))

sorted_result = sorted(result, key=lambda item: item['count'], reverse=True)

with open('repos.json', 'w') as json_file:
    json.dump(sorted_result, json_file)