import { Button } from "@/components/ui/button";
import { createFileRoute } from "@tanstack/react-router";
import { RiGithubFill } from "react-icons/ri";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { CobeScaled } from "@/components/ui/cobeGlobeScaled";
import { invoke } from "@tauri-apps/api/core";

export const Route = createFileRoute("/login/")({
  component: Login,
});

function Login() {
  const handleClose = async () => {
    await invoke("exit_app");
  };

  return (
    <AuroraBackground>
      <div className="w-full h-screen flex justify-center relative overflow-hidden flex-col items-center">
        <Button size={"lg"}>
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
