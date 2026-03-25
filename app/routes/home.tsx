import { ArrowRight, ArrowUpRight, Clock, Layers } from "lucide-react";
import type { Route } from "./+types/home";
import Navbar from "components/Navbar";
import Button from "components/ui/Button";
import Upload from "components/Upload";
import Footer from "components/Footer";

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
                    Meta Arch turns concepts into stunning 3D environments with
                    intelligent automation
                </p>

                <div className="actions">
                    <a href="#upload" className="cta">
                        Start Building <ArrowRight className="icon" />
                    </a>

                    <Button variant="outline" size="lg" className="demo">
                        Watch Demo
                    </Button>
                </div>

                <div id="upload" className="upload-shell cursor-pointer">
                    <div className="grid-overlay" />
                    <div className="upload-card">
                        <div className="upload-head">
                            <div className="upload-icon">
                                <Layers className="icon" />
                            </div>

                            <h3>Upload your floor plan</h3>
                            <p>Supports JPG, PNG, formats up to 10MB</p>
                        </div>

                        <Upload />
                    </div>
                </div>
            </section>

            <section className="projects">
                <div className="section-inner">
                    <div className="section-head">
                        <div className="copy">
                            <h2>Projects</h2>
                            <p>
                                Your latest work and shared community projects,
                                all in one place.
                            </p>
                        </div>
                    </div>

                    <div className="projects-grid">
                        <div className="project-card group">
                            <div className="preview">
                                <img
                                    src="logo.jpg"
                                    alt="Project"
                                />

                                <div className="badge">
                                    <span>Community</span>
                                </div>
                            </div>

                            <div className="card-body">
                                  <div>
                                      <h3>Meta Arch</h3>

                                      <div className="meta">
                                          <Clock size={12} />
                                          <span>Time</span>
                                          <span>By Meta Arch</span>
                                      </div>
                                  </div>
                                  <div className="arrow">
                                      <ArrowUpRight size={18} />
                                  </div>
                              </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer/>
        </div>
    );
}
