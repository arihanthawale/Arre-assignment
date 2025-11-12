import "./Footer.css";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaLinkedin,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footer">
      {/* <div className="partner-strip">
        <div className="partner">
          The Economic Times <p>"Lorem ipsum dolor sit amet, consectetur."</p>
        </div>
        <div className="partner">
          Indian Television <p>"Lorem ipsum dolor sit amet, consectetur."</p>
        </div>
        <div className="partner">
          World Association <p>"Lorem ipsum dolor sit amet, consectetur."</p>
        </div>
        <div className="partner">
          Telangana Today <p>"Lorem ipsum dolor sit amet, consectetur."</p>
        </div>
        <div className="partner">
          Brand Equity <p>"Lorem ipsum dolor sit amet, consectetur."</p>
        </div>
      </div> */}

      <div className="footer-main">
        <div className="logo">Arré</div>

        <div className="socials" aria-hidden>
          <span className="social">
            <FaFacebookF />
          </span>
          <span className="social">
            <FaInstagram />
          </span>
          <span className="social">
            <FaTwitter />
          </span>
          <span className="social">
            <FaYoutube />
          </span>
          <span className="social">
            <FaLinkedin />
          </span>
        </div>

        <nav className="footer-nav" aria-label="Footer navigation">
          <a href="#">HOME</a>
          <a href="#">STUDIO</a>
          <a href="#">VOICE</a>
          <a href="#">AWARDS</a>
          <a href="#">ABOUT</a>
        </nav>

        <div className="legal">
          <a href="#">Terms and Conditions</a>
          <a href="#">Privacy Policy</a>
        </div>
      </div>

      <div className="stripe" aria-hidden></div>

      <div className="footer-bottom">
        Only For Arihant &nbsp; © 2024 - All Rights Reserved
      </div>
    </footer>
  );
}
