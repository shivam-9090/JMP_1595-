from flask import Flask, request, render_template_string

app = Flask(__name__)

@app.route('/save_login', methods=['POST'])
def save_login():
    username = request.form['username']
    password = request.form['password']
    
    if not username or not password:
        return "Please enter both username and password.", 400
    
    with open("login_data.txt", "a") as file:
        file.write(f"Username: {username}, Password: {password}\n")
    
    return "Login data saved successfully!"

if __name__ == '__main__':
    app.run(debug=True)
