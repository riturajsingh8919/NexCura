import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Smartphone, Download } from "lucide-react";

function HeroBottomBar() {
  return (
    <div className="relative mt-12 lg:mt-20 mb-14">
      {/* Glassmorphism Container */}
      <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl py-3 px-6 shadow-2xl">
        {/* Subtle gradient overlay */}
        <div
          className="absolute inset-0 rounded-2xl opacity-50"
          style={{
            background:
              "linear-gradient(166.77deg, rgba(20, 69, 163, 0.05) 31.42%, rgba(133, 14, 128, 0.08) 99.23%, rgba(9, 41, 100, 0.05) 106.33%)",
          }}
        ></div>

        <div className="relative z-10 flex flex-col lg:flex-row gap-8 lg:items-center justify-between">
          {/* App Store Section */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 mb-2">
              <Download className="w-5 h-5 text-blue-300" />
              <h3 className="text-white font-semibold text-lg">
                Download Our App
              </h3>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Link
                href={"#appstore"}
                className="group flex gap-4 items-center p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                <div className="flex-shrink-0">
                  <Image
                    src="/appstore.png"
                    alt="App Store"
                    width={48}
                    height={48}
                    className="h-12 w-auto object-cover"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-white/70 text-xs font-medium">
                    Available on the
                  </p>
                  <span className="text-white text-sm font-bold group-hover:text-blue-200 transition-colors">
                    App Store
                  </span>
                </div>
              </Link>

              <Link
                href={"#playstore"}
                className="group flex gap-4 items-center p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                <div className="flex-shrink-0">
                  <Image
                    src="/playstore.png"
                    alt="Play Store"
                    width={48}
                    height={48}
                    className="h-12 w-auto object-cover"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-white/70 text-xs font-medium">
                    Available on the
                  </p>
                  <span className="text-white text-sm font-bold group-hover:text-blue-200 transition-colors">
                    Play Store
                  </span>
                </div>
              </Link>
            </div>
          </div>

          {/* Recognition Section */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 mb-2">
              <ExternalLink className="w-5 h-5 text-purple-300" />
              <h3 className="text-white font-semibold text-lg">Recognition</h3>
            </div>

            <div className="flex items-center gap-6">
              <Link
                href={
                  "https://www.tagonline.org/tagwire/2025-top-40-innovative-companies-in-georgia/"
                }
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-110 hover:shadow-xl"
                title="Top 40 Innovative Companies in Georgia"
              >
                <Image
                  src={"/georgia.png"}
                  alt={"Georgia Innovation Award"}
                  width={120}
                  height={120}
                  className="w-16 sm:w-20 md:w-24 lg:w-28 h-auto object-contain"
                  quality={90}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>

              <Link
                href={
                  "https://mailchi.mp/startupatlanta/news-updates-from-the-atlanta-startup-ecosystem-10124871?e=b3f1aa3ad7"
                }
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-110 hover:shadow-xl"
                title="Featured in Startup Atlanta"
              >
                <Image
                  src={"/startup.png"}
                  alt={"Startup Atlanta Feature"}
                  width={140}
                  height={140}
                  className="w-20 sm:w-24 md:w-28 lg:w-32 h-auto object-contain"
                  quality={90}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-600/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroBottomBar;
