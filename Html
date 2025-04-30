import tkinter as tk
from tkinter import messagebox
import random
import pygame
import os
# Initialize pygame for sound
pygame.init()
pygame.mixer.init()

# Background music setup
try:
    pygame.mixer.music.load("sounds/musics/background.wav")
    pygame.mixer.music.set_volume(0.3)  # Volume from 0.0 to 1.0
    pygame.mixer.music.play(-1)  # Loop forever
except Exception as e:
    print("Background Music Error:", e)

# Load sound effects
try:
    move_sound = pygame.mixer.Sound("sounds/musics/move.wav")
    win_sound = pygame.mixer.Sound("sounds/musics/win.wav")
    draw_sound = pygame.mixer.Sound("sounds/musics/draw.wav")
except Exception as e:
    print("Sound Load Error:", e)

def play_move_sound():
    try:
        move_sound.play()
    except:
        pass

def play_win_sound():
    try:
        win_sound.play()
    except:
        pass

def play_draw_sound():
    try:
        draw_sound.play()
    except:
        pass

root = tk.Tk()
root.title("Tic Tac Toe")

buttons = []
player = "X"
game_running = False
mode = "2Player"
player_score = 0
opponent_score = 0
screen_mode = "Desktop"
confetti_labels = []

def set_screen_mode(choice):
    global screen_mode
    screen_mode = choice
    mode_selection_frame.pack_forget()
    show_mode_selection()

def show_mode_selection():
    start_frame.pack_forget()
    mode_frame.pack(expand=True)

def start_game(selected_mode):
    global mode, player, game_running, player_score, opponent_score
    mode = selected_mode
    player = "X"
    game_running = True
    mode_frame.pack_forget()
    create_board()

def create_board():
    global buttons
    board_frame.pack(expand=True)
    size = 5 if screen_mode == "Mobile" else 8
    for i in range(3):
        row = []
        for j in range(3):
            btn = tk.Button(board_frame, text="", font=("Arial", size), width=4, height=2,
                            command=lambda i=i, j=j: on_click(i, j))
            btn.grid(row=i, column=j, padx=5, pady=5)
            row.append(btn)
        buttons.append(row)
    score_label.pack()
    restart_button.pack(pady=10)

def reset_board():
    global buttons, player, game_running
    for widget in board_frame.winfo_children():
        widget.destroy()
    buttons.clear()
    board_frame.pack_forget()
    restart_button.pack_forget()
    score_label.pack_forget()
    player = "X"
    game_running = False
    show_mode_selection()

def clear_board_for_next_game():
    global buttons, player, game_running
    for widget in board_frame.winfo_children():
        widget.destroy()
    buttons.clear()
    player = "X"
    game_running = True
    create_board()

def on_click(i, j):
    global player, game_running

    if not game_running:
        return

    button = buttons[i][j]
    if button["text"] == "":
        button["text"] = player
        play_move_sound()
        winner = check_winner()

        if winner:
            finish_game(winner)
            return

        if player == "X":
            player = "O"
            if mode == "Computer":
                root.after(500, computer_move)
        else:
            player = "X"

def computer_move():
    global player, game_running

    empty = [(i, j) for i in range(3) for j in range(3) if buttons[i][j]["text"] == ""]
    if empty and game_running:
        i, j = random.choice(empty)
        buttons[i][j]["text"] = player
        play_move_sound()
        winner = check_winner()

        if winner:
            finish_game(winner)
            return
        player = "X"

def check_winner():
    for i in range(3):
        if buttons[i][0]["text"] == buttons[i][1]["text"] == buttons[i][2]["text"] != "":
            return buttons[i][0]["text"]
        if buttons[0][i]["text"] == buttons[1][i]["text"] == buttons[2][i]["text"] != "":
            return buttons[0][i]["text"]
    if buttons[0][0]["text"] == buttons[1][1]["text"] == buttons[2][2]["text"] != "":
        return buttons[0][0]["text"]
    if buttons[0][2]["text"] == buttons[1][1]["text"] == buttons[2][0]["text"] != "":
        return buttons[0][2]["text"]
    if all(buttons[i][j]["text"] != "" for i in range(3) for j in range(3)):
        return "Draw"
    return None

def finish_game(winner):
    global player_score, opponent_score, game_running

    game_running = False

    if winner == "Draw":
        play_draw_sound()
        messagebox.showinfo("Result", "It's a Draw!")
    else:
        play_win_sound()
        if winner == "X":
            player_score += 1
            messagebox.showinfo("Winner", "You Win this Game!")
        else:
            opponent_score += 1
            messagebox.showinfo("Winner", "Opponent Wins this Game!")

    update_score()

    if player_score == 3:
        confetti_blast()
        messagebox.showinfo("Final Winner", "You are the Final Winner! Congratulations!")
        reset_board()
    elif opponent_score == 3:
        confetti_blast()
        messagebox.showinfo("Final Winner", "Opponent is the Final Winner!")
        reset_board()
    else:
        clear_board_for_next_game()

def update_score():
    score_label.config(text=f"You: {player_score}  |  Opponent: {opponent_score}")

def confetti_blast():
    colors = ["red", "yellow", "blue", "green", "orange", "pink", "purple"]
    for _ in range(100):
        x = random.randint(0, root.winfo_width())
        y = random.randint(0, root.winfo_height())
        color = random.choice(colors)
        size = random.randint(5, 15)
        label = tk.Label(root, bg=color, width=size//2, height=size//6)
        label.place(x=x, y=y)
        confetti_labels.append(label)
    root.after(2000, clear_confetti)

def clear_confetti():
    for label in confetti_labels:
        label.destroy()
    confetti_labels.clear()

# UI Frames
start_frame = tk.Frame(root)
mode_selection_frame = tk.Frame(root)
mode_frame = tk.Frame(root)
board_frame = tk.Frame(root)
restart_button = tk.Button(root, text="Restart", font=("Arial", 14), bg="green", fg="white", command=reset_board)
score_label = tk.Label(root, text="", font=("Arial", 16), pady=10)

# Start screen
game_title = tk.Label(start_frame, text="Tic Tac Toe", font=("Arial", 32), fg="blue")
start_btn = tk.Button(start_frame, text="Start", font=("Arial", 20), bg="skyblue", command=lambda: show_device_selection())
game_title.pack(pady=20)
start_btn.pack(pady=20)
start_frame.pack(expand=True)

# Device selection screen
def show_device_selection():
    start_frame.pack_forget()
    mode_selection_frame.pack(expand=True)
    mobile_btn = tk.Button(mode_selection_frame, text="Mobile", font=("Arial", 16), bg="#457b9d", fg="white",
                            command=lambda: set_screen_mode("Mobile"))
    desktop_btn = tk.Button(mode_selection_frame, text="Desktop", font=("Arial", 16), bg="#1d3557", fg="white",
                            command=lambda: set_screen_mode("Desktop"))
    mobile_btn.pack(pady=10, fill="x", padx=30)
    desktop_btn.pack(pady=10, fill="x", padx=30)

# Mode selection screen
two_player_btn = tk.Button(mode_frame, text="2 Player", font=("Arial", 18), bg="#f4a261", fg="black",
                           command=lambda: start_game("2Player"))
computer_btn = tk.Button(mode_frame, text="Computer", font=("Arial", 18), bg="#e76f51", fg="white",
                         command=lambda: start_game("Computer"))
two_player_btn.pack(pady=10, fill="x", padx=30)
computer_btn.pack(pady=10, fill="x", padx=30)

# Run
root.mainloop()