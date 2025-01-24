const { Spot } = require('../../db/models'); // Make sure you're importing your Spot model

const getSpots = async (req, res) => {
  try {
    const {
      page = 1,
      size = 20,
      minLat,
      maxLat,
      minLng,
      maxLng,
      minPrice,
      maxPrice,
    } = req.query;

    // Validate and parse the page and size query params
    const parsedPage = Math.max(1, Math.min(page, 10)); // Ensure it's between 1 and 10
    const parsedSize = Math.max(1, Math.min(size, 20)); // Ensure it's between 1 and 20

    // Build the query filters based on the optional parameters
    const filter = {};

    if (minLat) filter.lat = { ...filter.lat, [Op.gte]: minLat };
    if (maxLat) filter.lat = { ...filter.lat, [Op.lte]: maxLat };
    if (minLng) filter.lng = { ...filter.lng, [Op.gte]: minLng };
    if (maxLng) filter.lng = { ...filter.lng, [Op.lte]: maxLng };
    if (minPrice) filter.price = { ...filter.price, [Op.gte]: minPrice };
    if (maxPrice) filter.price = { ...filter.price, [Op.lte]: maxPrice };

    // Fetch the filtered spots
    const { rows: spots, count } = await Spot.findAndCountAll({
      where: filter,
      limit: parsedSize,
      offset: (parsedPage - 1) * parsedSize,
    });

    // Calculate the average rating for each spot if necessary (assuming you have a review system)
    const spotsWithRatings = await Promise.all(
      spots.map(async (spot) => {
        const avgRating = await spot.getReviews().then((reviews) => {
          if (reviews.length > 0) {
            const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
            return sum / reviews.length;
          }
          return 0;
        });

        return {
          ...spot.toJSON(),
          avgRating, // Include average rating in the response
          previewImage: spot.previewImage, // Include preview image URL
        };
      })
    );

    // Calculate total pages
    const totalPages = Math.ceil(count / parsedSize);

    res.json({
      Spots: spotsWithRatings,
      page: parsedPage,
      size: parsedSize,
      totalPages,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { getSpots };