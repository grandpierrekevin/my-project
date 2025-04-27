import { Player } from "@lottiefiles/react-lottie-player";
import animationData from "@/assets/loaders/ventes.json";

export default function ClientsLoader() {
  return (
    <div className="flex justify-center items-center h-full">
      <Player
        autoplay
        loop
        src={animationData}
        style={{ height: "300px", width: "300px" }}
      />
    </div>
  );
}
