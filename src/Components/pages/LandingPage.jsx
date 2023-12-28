import HeroSection from "../HeroSection";
import Course from "../Course";
import Form from "../Form";
import { coursesInfo } from "../../util/courses-info";

export default function LandingPage() {
  return (
    <>
      <img
        id="kantra-logo"
        src="https://9antra.tn/content/images/LogoBridge.png"
        alt="the-bridge-logo"
      />
      <HeroSection />
      <div id="courses-section">
        <div id="section-title">
          <h2>Discover Our Courses</h2>
          <button>View More</button>
        </div>
        <div id="courses-container">
          {coursesInfo.map((course) => {
            return (
              <Course
                key={course.title}
                image={course.image}
                title={course.title}
                price={course.price}
              />
            );
          })}
        </div>
      </div>
      <div id="form-section">
        <h2>Contact Us</h2>
        <Form />
      </div>
    </>
  );
}
