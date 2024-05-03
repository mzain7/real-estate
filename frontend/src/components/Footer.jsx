import instagram from "../assets/icons/instagram-icon.svg";
import facebook from "../assets/icons/facebook-icon.svg";
import twitter from "../assets/icons/twitter-icon.svg";
import youtube from "../assets/icons/youtube-icon.svg";
import telegram from "../assets/icons/telegram-icon.svg";
import github from "../assets/icons/github-icon.svg";
export default function Footer() {
  return (
    <footer className="relative bg-slate-200 pt-8 pb-6">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-wrap text-left lg:text-left">
          <div className="w-full lg:w-6/12 px-4">
            <h4 className="text-3xl fonat-semibold text-blueGray-700">
              Let&rsquo;s keep in touch!
            </h4>
            <h5 className="text-lg mt-0 mb-2 text-blueGray-600">
              Find us on any of these platforms, we respond 1-2 business days.
            </h5>
            <div className="mt-6 lg:mb-0 mb-6 gap-3 flex">
              <a
                className="inline-block hover:shadow-lg rounded-full"
                href="https://www.twitter.com"
                target="_blank"
                rel="noreferrer"
              >
                <img className="overflow-hidden" src={twitter} alt="twitter" />
              </a>
              <a
                className="inline-block hover:shadow-lg rounded-full"
                href="https://www.facebook.com"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  className="overflow-hidden"
                  src={facebook}
                  alt="facebook"
                />
              </a>
              <a
                className="inline-block hover:shadow-lg rounded-full"
                href="https://www.instagram.com"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  className="overflow-hidden"
                  src={instagram}
                  alt="instagram"
                />
              </a>
              <a
                className="inline-block hover:shadow-lg rounded-full"
                href="https://www.telegram.com"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  className="overflow-hidden"
                  src={telegram}
                  alt="telegram"
                />
              </a>
              <a
                className="inline-block hover:shadow-lg rounded-full"
                href="https://www.youtube.com"
                target="_blank"
                rel="noreferrer"
              >
                <img className="overflow-hidden" src={youtube} alt="youtube" />
              </a>
              <a
                className="inline-block hover:shadow-lg rounded-full"
                href="https://github.com/mzain7/real-estate"
                target="_blank"
                rel="noreferrer"
              >
                <img className="overflow-hidden" src={github} alt="github" />
              </a>
            </div>
          </div>
          <div className="w-full lg:w-6/12 px-4">
            <div className="flex flex-wrap items-top mb-6">
              <div className="w-full md:w-1/2 lg:w-4/12 px-4 lg:ml-auto mb-5">
                <span className="block uppercase text-blueGray-500 text-sm font-semibold mb-2">
                  Useful Links
                </span>
                <ul className="list-unstyled">
                  <li>
                    <a
                      className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm hover:underline"
                      href=""
                    >
                      About Us
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm hover:underline"
                      href=""
                    >
                      Blog
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm hover:underline"
                      href=""
                    >
                      Github
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm hover:underline"
                      href=""
                    >
                      Free Products
                    </a>
                  </li>
                </ul>
              </div>
              <div className=" md:1/2 lg:w-4/12 px-4">
                <span className="block uppercase text-blueGray-500 text-sm font-semibold mb-2">
                  Other Resources
                </span>
                <ul className="list-unstyled">
                  <li>
                    <a
                      className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm hover:underline"
                      href=""
                    >
                      MIT License
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm hover:underline"
                      href=""
                    >
                      Terms &amp; Conditions
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm hover:underline"
                      href=""
                    >
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm hover:underline"
                      href=""
                    >
                      Contact Us
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <hr className="my-6 border-blueGray-300" />
        <div className="flex flex-wrap items-center md:justify-between justify-center">
          <div className="w-full md:w-4/12 px-4 mx-auto text-center">
            <div className="text-sm text-blueGray-500 font-semibold py-1">
              Copyright © <span id="get-current-year">2023</span>
              <a
                href=""
                className="text-blueGray-500 hover:text-gray-800"
                target="_blank"
                rel="noreferrer"
              >
                {" "}
                Real Estate by{" "}
              </a>
              <a
                href="https://www.creative-tim.com?ref=njs-profile"
                className="text-blueGray-500 hover:text-blueGray-800"
              >
                Zain
              </a>
              .
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
