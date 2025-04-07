from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime
from flask_cors import cross_origin

app = Flask(__name__)

# Enable CORS for all routes in the app
CORS(app, resources={r"/*": {"origins": "https://reactbugtracker.onrender.com"}})



# In-memory data structure to hold bugs
bugs = []

@app.route('/bugs', methods=['GET'])
def get_bugs():
    return jsonify(bugs)

@app.route('/bugs/<int:bug_id>', methods=['PUT'])
@cross_origin()  # Explicitly allow CORS for this route
def update_bug(bug_id):
    data = request.get_json()
    bug = next((b for b in bugs if b['id'] == bug_id), None)  # Find bug by id in the list
    if bug:
        bug['title'] = data['title']
        bug['description'] = data['description']
        bug['assigned_to'] = data['assigned_to']
        bug['status'] = data['status']
        bug['priority'] = data['priority']
        bug['createdAt'] = datetime.strptime(data['createdAt'], "%Y-%m-%d").date() if data.get('createdAt') else None
        bug['finishedAt'] = datetime.strptime(data['finishedAt'], "%Y-%m-%d").date() if data.get('finishedAt') else None
        return jsonify({'message': 'Bug updated successfully', 'bug': bug}), 200
    else:
        return jsonify({'message': 'Bug not found'}), 404

@app.route('/bugs', methods=['POST'])
def submit_bug():
    data = request.get_json()  # Get the JSON data from the request body
    bug = {
        'id': len(bugs) + 1,  # Simple incrementing id for in-memory storage
        'title': data['title'],
        'status': data['status'],
        'priority': data['priority'],
        'description': data['description'],
        'assigned_to': data['assigned_to'],
        'createdAt': datetime.strptime(data['createdAt'], "%Y-%m-%d").date() if data.get('createdAt') else None,
        'finishedAt': datetime.strptime(data['finishedAt'], "%Y-%m-%d").date() if data.get('finishedAt') else None
    }
    bugs.append(bug)  # Add the new bug to the list
    print("New Bug Submitted:", bug)
    return jsonify(bug), 201  # Return the created bug as JSON and a 201 status code

if __name__ == '__main__':
    app.run(debug=True)
