import { Player } from "@lottiefiles/react-lottie-player";
import animationData from "@/assets/loaders/pageClients.json";

export default function ClientsLoader({ isActive = true }) {
  return (
    <div className="flex justify-center items-center h-full">
      <Player
        autoplay={isActive}
        loop={isActive}
        src={animationData}
        style={{ height: "300px", width: "300px" }}
      />
    </div>
  );
}
