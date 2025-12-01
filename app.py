from flask import Flask, render_template, request, jsonify, session
import random
import os

app = Flask(__name__, static_folder="static", template_folder="templates")
app.secret_key = os.environ.get("FLASK_SECRET_KEY", "change-this-in-prod")

app.config["SESSION_COOKIE_SECURE"] = True
app.config["SESSION_COOKIE_HTTPONLY"] = True
app.config["SESSION_COOKIE_SAMESITE"] = "Lax"

OPTIONS = ["Snake", "Water", "Gun"]

# Add this helper function to your Python code
def get_winning_move(user_move):
    if user_move == "Snake": return "Gun"
    if user_move == "Water": return "Snake"
    if user_move == "Gun": return "Water"

def decide_winner(user_choice: str, comp_choice: str):
    u = user_choice.capitalize()
    c = comp_choice
    if u == c:
        return "draw", "Draw, better luck next time!"
    if u == "Snake":
        if c == "Water":
            return "win", "Snake drinks the water — you won."
        else:
            return "lose", "Gun kills the snake — you lose."
    if u == "Water":
        if c == "Gun":
            return "win", "Water damages the gun — you won."
        else:
            return "lose", "Snake drinks the water — you lose."
    if u == "Gun":
        if c == "Snake":
            return "win", "Gun kills the snake — you won."
        else:
            return "lose", "Water damages the gun — you lose."
    return "error", "Invalid choice."

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/start", methods=["POST"])
def start():
    # Start a new *active* game: reset attempts/history and mark game active
    session["attempts"] = 0
    session["history"] = []
    session["game_active"] = True
    return jsonify({
        "status": "ok",
        "message": "Game started. Choose Snake, Water, or Gun to play.",
        "game_active": True,
        "attempts": 0,
        "history": []
    })

@app.route("/play", methods=["POST"])
def play():
    # Ensure a game is active; otherwise instruct to press Start
    if not session.get("game_active", False):
        return jsonify({"status": "error", "message": "Game is not active. Press Start to begin."}), 400

    data = request.get_json()
    if not data or "choice" not in data:
        return jsonify({"status": "error", "message": "Missing 'choice' in JSON body."}), 400

    choice = str(data["choice"]).strip()
    if choice.lower() not in ("snake", "water", "gun"):
        return jsonify({"status": "error", "message": "Choice must be one of 'Snake', 'Water', 'Gun'."}), 400

    # Inside your /play route:
    # Instead of: computer_choice = random.choice(["Snake", "Water", "Gun"])
    # Use this:
    winning_move = get_winning_move(choice)
    if random.random() < 0.7:
        comp_choice = winning_move
    else:
        comp_choice = random.choice(["Snake", "Water", "Gun"])
    session["attempts"] = session.get("attempts", 0) + 1

    result, message = decide_winner(choice, comp_choice)

    entry = {
        "attempt": session["attempts"],
        "you": choice.capitalize(),
        "computer": comp_choice,
        "result": result,
        "message": message
    }
    history = session.get("history", [])
    history.append(entry)
    session["history"] = history

    response = {
        "status": "ok",
        "attempts": session["attempts"],
        "you": choice.capitalize(),
        "computer": comp_choice,
        "result": result,
        "message": message,
        "history": history,
        "game_active": True
    }

    # If user wins, mark game inactive but DO NOT reset history/attempts.
    if result == "win":
        session["game_active"] = False
        response["game_active"] = False
        response["game_over"] = True
        response["final_attempts"] = session["attempts"]
    else:
        response["game_over"] = False

    return jsonify(response)