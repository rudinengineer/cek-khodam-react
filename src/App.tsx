import { Canvas } from "@react-three/fiber";
import React from "react";
import { OrbitControls, useProgress } from "@react-three/drei";
import Witch from "./components/Witch";
import Progress from "./components/Progress";
import { useStore } from "./lib/store";
import { khodamList } from "./constants/khodam";
import { useLocation } from "react-router-dom";
import Api from "./Api";

function App() {
  const { hash } = useLocation();
  const progress = useProgress();
  const { setAnimation } = useStore();
  const [name, setName] = React.useState<string>("");
  const [isLoading, setLoading] = React.useState<boolean>(false);
  const [loadingProgress, setLoadingProgress] = React.useState<number>(0);
  const [result, setResult] = React.useState<string | null>(null);

  const checkKhodam = () => {
    setAnimation("Waiting");
    const names = JSON.parse(localStorage.getItem("names") ?? "{}");
    if (
      names[name?.toLowerCase()] &&
      Number(names[name?.toLowerCase()]["count"]) < 5
    ) {
      names[name?.toLowerCase()]["count"] =
        Number(names[name?.toLowerCase()]["count"]) + 1;
      setResult(names[name?.toLowerCase()]["result"]);
    } else {
      const result = khodamList[Math.floor(Math.random() * khodamList.length)];
      names[name?.toLowerCase()] = {
        result: result,
        count: 1,
      };
      setResult(result);
    }
    localStorage.setItem("names", JSON.stringify(names));
  };

  const handleButton = () => {
    setLoading(true);
    setAnimation("PortalOpen");
    const progress = setInterval(() => {
      setLoadingProgress((state) => state + 20);
    }, 1000);
    setTimeout(() => {
      clearInterval(progress);
      checkKhodam();
    }, 5500);
  };

  const handleBack = () => {
    setLoading(false);
    setAnimation("Waiting");
    setLoadingProgress(0);
    setResult(null);
    setName("");
  };

  return hash === "#api" ? (
    <Api />
  ) : (
    <main className="w-full h-screen flex justify-center items-center">
      {progress.active ? (
        <div className="w-full h-full fixed top-0 left-0 flex justify-center items-center">
          <div>
            <h1 className="text-sm">Loading...</h1>
            <Progress progress={progress.progress} width="130px" />
          </div>
        </div>
      ) : (
        <div className="w-[85%] sm:w-2/3 md:w-[35%]">
          <div className="p-8 rounded-lg bg-gradient-to-br from-[#141E46] to-[#01204E] shadow-xl">
            <Canvas
              camera={{ position: [0, 1, 2.5], fov: 37 }}
              className="aspect-[9/16] max-h-52"
            >
              <OrbitControls
                enableZoom={false}
                enablePan={false}
                minPolarAngle={Math.PI / 2}
                maxPolarAngle={Math.PI - Math.PI / 2}
              />
              <ambientLight />
              <group position={[0, -0.8, 0]}>
                <Witch />
              </group>
            </Canvas>
            {isLoading ? (
              <div className="mt-4">
                {result ? (
                  <div>
                    <h1 className="text-slate-200 text-xl font-semibold text-center">
                      Khodam kamu adalah : <br />
                      {result}
                    </h1>
                    <button
                      className="mt-4 w-full bg-primary bg-opacity-80 transition ease-in-out hover:bg-opacity-90 py-3 rounded-md font-semibold"
                      onClick={handleBack}
                    >
                      Kembali
                    </button>
                  </div>
                ) : (
                  <div>
                    <h1 className="text-sm text-center mb-2">
                      Mengecek khodam...
                    </h1>
                    <Progress progress={loadingProgress} width="100%" />
                  </div>
                )}
              </div>
            ) : (
              <div>
                <input
                  type="text"
                  placeholder="Nama Kamu"
                  autoComplete="off"
                  className="mt-4 w-full bg-transparent text-center outline-none px-4 py-3 rounded-md border-[1px] border-slate-600 text-slate-300 transition ease-in-out focus:border-slate-500"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
                <button
                  className="mt-4 w-full bg-primary bg-opacity-80 transition ease-in-out hover:bg-opacity-90 py-3 rounded-md font-semibold"
                  onClick={handleButton}
                  disabled={name?.length ? false : true}
                >
                  Cek Khodam
                </button>
              </div>
            )}
          </div>
          <h1 className="mt-1.5 text-xs sm:text-sm text-center text-slate-400">
            Development by{" "}
            <a href="https://github.com/rudinengineer" className="underline">
              rudin
            </a>
            ❤️
          </h1>
        </div>
      )}
    </main>
  );
}

export default App;
