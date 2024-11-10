from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
from recommendation_test import ItineraryGenerator

itinerary_generator = ItineraryGenerator(
    model_path='models/content_model.h5',
    encoder_location_path='models/encoder_location.pkl',
    encoder_category_path='models/encoder_category.pkl',
    scaler_path='models/scaler.pkl',
    data_path='data/places_data.csv'
)


app = Flask(__name__)

# Enable CORS for all routes
CORS(app)

@app.route('/plan_activity', methods=['GET'])
def plan_activity():
    # Get data from the query string
    location = request.args.get('location', default="New Delhi")
    budget = int(request.args.get('budget', default=912))
    duration = int(request.args.get('duration', default=12))
    age_groups = request.args.get('age_group', default="16-40")
    category = request.args.get('category', default="")

    print(f"Location: {location}, Budget: {budget}, Duration: {duration}, Age Groups: {age_groups}, Category: {category}")

    
    # Check if all required parameters are provided
    if not location or not budget or not duration or not age_groups:
        return jsonify({"error": "Missing required parameters"}), 400
    

    recommendations = itinerary_generator.generate_itineraries_with_age_group(location, budget, duration, age_groups, category)
    
    # Return the itineraries with their details
    return jsonify({
        "recommendations": recommendations
    })

if __name__ == '__main__':
    app.run(debug=True)
