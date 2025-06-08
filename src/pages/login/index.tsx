import { Button } from "@/components/ui/button";
import { RiGithubFill } from "react-icons/ri";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { CobeScaled } from "@/components/ui/cobeGlobeScaled";
import { invoke } from "@tauri-apps/api/core";
import NommitDark from "@/assets/nommit-dark.svg";

export default function LoginPage() {
  const handleClose = async () => {
    await invoke("exit_app");
  };

  const handleLogin = async () => {
    await invoke("init_app");
  };

  return (
    <AuroraBackground>
      <div className="w-full h-screen flex justify-center relative overflow-hidden flex-col items-center">
        <img src={NommitDark} className="w-42 mb-5" alt="Nommit" />
        <Button size={"lg"} onClick={handleLogin}>
          <RiGithubFill size={16} aria-hidden="true" />
          Login with GitHub
        </Button>
        <Button
          className="cursor-pointer font-normal"
          variant={"link"}
          size={"sm"}
          onClick={handleClose}
        >
          Close
        </Button>
      </div>
      <CobeScaled />
    </AuroraBackground>
  );
}
