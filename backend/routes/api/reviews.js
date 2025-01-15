// routes/api/reviews.js

const { Op } = require("sequelize");
const express = require('express');
const router = express.Router();


const { User } = require('../../db/models');
const { Spot, Review, SpotImage, ReviewImages } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

router.get('/current', requireAuth, async (req, res) => {
  try {
    const { user } = req; // Get the authenticated user (from requireAuth middleware)

    // Fetch reviews by the current user
    const reviews = await Review.findAll({
      where: { userId: user.id },
      include: [
        {
          model: Spot,
          as: 'spot', // Use the alias defined in the model
          attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price', 'previewImage'],
        },
        {
          model: User,
          as: 'user', // Use the alias defined in the model
          attributes: ['id', 'firstName', 'lastName'],
        },
        {
          model: ReviewImages,
          as: 'ReviewImages', // Use the alias defined in the model
          attributes: ['id', 'url'],
        }
      ],
    });

    // Format the reviews according to the API docs
    const formattedReviews = reviews.map(review => {
      return {
        id: review.id,
        userId: review.userId,
        spotId: review.spotId,
        review: review.review,
        stars: review.stars,
        createdAt: review.createdAt,
        updatedAt: review.updatedAt,
        User: {
          id: review.user.id,
          firstName: review.user.firstName,
          lastName: review.user.lastName
        },
        Spot: {
          id: review.spot.id,
          ownerId: review.spot.ownerId,
          address: review.spot.address,
          city: review.spot.city,
          state: review.spot.state,
          country: review.spot.country,
          lat: review.spot.lat,
          lng: review.spot.lng,
          name: review.spot.name,
          price: review.spot.price,
          previewImage: review.spot.previewImage
        },
        ReviewImages: review.ReviewImages.map(image => ({
          id: image.id,
          url: image.url
        }))
      };
    });

    // Return the formatted reviews
    return res.status(200).json({ Reviews: formattedReviews });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred while fetching reviews.' });
  }
});


// Add an image to a review
router.post('/:reviewId/images', requireAuth, async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { url } = req.body;

    // Find the review
    const review = await Review.findByPk(reviewId);

    if (!review) {
      return res.status(404).json({ message: 'Review couldn\'t be found' });
    }

    // Ensure the user owns the review
    if (review.userId !== req.user.id) {
      return res.status(403).json({ message: 'Forbidden: You do not own this review' });
    }

    // Check if the review already has 10 images
    const imageCount = await ReviewImages.count({ where: { reviewId } });
    if (imageCount >= 10) {
      return res.status(403).json({ message: 'Maximum number of images for this resource was reached' });
    }

    // Create the new review image
    const newImage = await ReviewImages.create({
      reviewId,
      url,
    });

    // Respond with the created image
    return res.status(201).json({
      id: newImage.id,
      url: newImage.url,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});



router.put('/:reviewId', requireAuth, async (req, res) => {
  try {
    const { reviewId } = req.params; // Get review ID from URL
    const { review, stars } = req.body; // Extract data from request body

    // Validate input
    if (!review || !stars || stars < 1 || stars > 5) {
      return res.status(400).json({
        message: "Validation error",
        errors: {
          review: "Review text is required",
          stars: "Stars must be an integer from 1 to 5"
        }
      });
    }

    // Find the review by ID
    const existingReview = await Review.findByPk(reviewId);

    if (!existingReview) {
      return res.status(404).json({ message: "Review couldn't be found" });
    }

    // Check if the logged-in user owns the review
    if (existingReview.userId !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized to edit this review" });
    }

    // Update the review
    existingReview.review = review;
    existingReview.stars = stars;
    await existingReview.save(); // Save changes to the database

    // Return the updated review
    res.status(200).json({
      id: existingReview.id,
      userId: existingReview.userId,
      spotId: existingReview.spotId,
      review: existingReview.review,
      stars: existingReview.stars,
      createdAt: existingReview.createdAt,
      updatedAt: existingReview.updatedAt
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});


router.delete('/:reviewId', requireAuth, async (req, res) => {
    try {
      const { reviewId } = req.params; // Get the review ID from the URL

      // Find the review by ID
      const review = await Review.findByPk(reviewId);

      // If the review doesn't exist, return a 404 error
      if (!review) {
        return res.status(404).json({ message: "Review couldn't be found" });
      }

      // Check if the logged-in user owns the review
      if (review.userId !== req.user.id) {
        return res.status(403).json({ message: "Unauthorized to delete this review" });
      }

      // Delete the review
      await review.destroy();

      // Respond with a success message
      res.status(200).json({ message: "Successfully deleted" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });



module.exports = router;
