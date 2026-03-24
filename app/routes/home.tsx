import { ArrowRight } from "lucide-react";
import type { Route } from "./+types/home";
import Navbar from "components/Navbar";
import Button from "components/ui/Button";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "New React Router App" },
        { name: "description", content: "Welcome to React Router!" },
    ];
}

export default function Home() {
    return (
        <div className="home">
            <Navbar />

            <section className="hero">
              <div className="announce">
                  <div className="dot">
                      <div className="pulse"></div>
                  </div>

                  <p>Introducing Meta Arch</p>
              </div>

              <h1>Where ideas become spaces</h1>

              <p className="subtitle">
                  Meta Arch turns concepts into stunning 3D environments with intelligent automation
              </p>

              <div className="actions">
                  <a href="#upload" className="cta">
                      Start Building <ArrowRight className="icon" />
                  </a>

                  <Button variant="outline" size="lg" className="demo">
                      Watch Demo
                  </Button>
              </div>
            </section>
        </div>
    );
}
