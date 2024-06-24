import tkinter as tk
from tkinter import messagebox

def save_login():
    username = entry_username.get()
    password = entry_password.get()
    
    if not username or not password:
        messagebox.showerror("Input Error", "Please enter both username and password.")
        return

    with open("login_data.txt", "a") as file:
        file.write(f"Username: {username}, Password: {password}\n")
    
    messagebox.showinfo("Success", "Login data saved successfully!")
    entry_username.delete(0, tk.END)
    entry_password.delete(0, tk.END)

# Create the main window
root = tk.Tk()
root.title("Login Saver")
root.geometry("300x200")

# Create and place the username and password labels and entries
label_username = tk.Label(root, text="Username")
label_username.pack(pady=5)
entry_username = tk.Entry(root)
entry_username.pack(pady=5)

label_password = tk.Label(root, text="Password")
label_password.pack(pady=5)
entry_password = tk.Entry(root, show="*")
entry_password.pack(pady=5)

# Create and place the save button
button_save = tk.Button(root, text="Save Login", command=save_login)
button_save.pack(pady=20)

# Run the main event loop
root.mainloop()
