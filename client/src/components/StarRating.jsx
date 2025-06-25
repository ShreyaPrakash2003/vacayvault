import { assets } from '../assets/assets';

const StarRating = ({ rating = 4 }) => {
  return (
    <div className="flex gap-0.5">
      {Array(5)
        .fill('')
        .map((_, index) => (
          <img
            key={index}
            alt="star-icon"
            className="w-4.5 h-4.5"
            src={rating > index ? assets.starIconFilled : assets.starIconOutlined}
          />
        ))}
    </div>
  );
};

export default StarRating;
