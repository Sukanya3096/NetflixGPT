import InfoIcon from "../assets/info-icon.svg";
const VideoTitle = ({ title, overview }) => {
  return (
    <div className="pt-[20%] px-20 absolute text-white bg-gradient-to-r from-black w-screen aspect-video">
      <h1 className="text-6xl font-bold">{title}</h1>
      <p className="py-2 px-2 text-lg w-1/4">{overview}</p>
      <div className="py-6">
        <button className="bg-white text-black p-4 px-16 text-lg mr-2 hover:bg-gray-200 rounded">
          <span className="mr-2">▶️ </span>Play
        </button>
        <button className="bg-gray-100 text-white p-4 px-16 text-lg hover:bg-opacity-50 rounded bg-opacity-25">
          <span className="mr-2">
            <img
              src={InfoIcon}
              alt="Info Icon"
              className="inline-block -mt-0.5"
            />
          </span>
          More Info
        </button>
      </div>
    </div>
  );
};
export default VideoTitle;
