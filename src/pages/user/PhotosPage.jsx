import React from "react";
import Section from "../../components/user/Section";
import Header from "../../components/shared/Header";

const PhotosPage = () => {
  return (
    <Section>
      <Header>Our Photos</Header>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        <div className="flex">
          <img
            className="rounded-xl"
            src="https://images.sidearmdev.com/resize?url=https%3A%2F%2Fdxbhsrqyrr690.cloudfront.net%2Fsidearm.nextgen.sites%2Fgomarquette.com%2Fimages%2F2025%2F3%2F13%2F20250313_MB_1001_AD.jpg&height=1100&type=webp"
            alt=""
          />
        </div>
        <div className="flex">
          <img
            className="rounded-xl"
            src="https://images.sidearmdev.com/resize?url=https%3A%2F%2Fdxbhsrqyrr690.cloudfront.net%2Fsidearm.nextgen.sites%2Fgomarquette.com%2Fimages%2F2025%2F3%2F13%2F20250313_MB_1001_AD.jpg&height=1100&type=webp"
            alt=""
          />
        </div>
        <div className="flex">
          <img
            className="rounded-xl"
            src="https://images.sidearmdev.com/resize?url=https%3A%2F%2Fdxbhsrqyrr690.cloudfront.net%2Fsidearm.nextgen.sites%2Fgomarquette.com%2Fimages%2F2025%2F3%2F13%2F20250313_MB_1001_AD.jpg&height=1100&type=webp"
            alt=""
          />
        </div>
        <div className="flex">
          <img
            className="rounded-xl"
            src="https://images.sidearmdev.com/resize?url=https%3A%2F%2Fdxbhsrqyrr690.cloudfront.net%2Fsidearm.nextgen.sites%2Fgomarquette.com%2Fimages%2F2025%2F3%2F13%2F20250313_MB_1001_AD.jpg&height=1100&type=webp"
            alt=""
          />
        </div>
        <div className="flex">
          <img
            className="rounded-xl"
            src="https://images.sidearmdev.com/resize?url=https%3A%2F%2Fdxbhsrqyrr690.cloudfront.net%2Fsidearm.nextgen.sites%2Fgomarquette.com%2Fimages%2F2025%2F3%2F13%2F20250313_MB_1001_AD.jpg&height=1100&type=webp"
            alt=""
          />
        </div>
        <div className="flex">
          <img
            className="rounded-xl"
            src="https://images.sidearmdev.com/resize?url=https%3A%2F%2Fdxbhsrqyrr690.cloudfront.net%2Fsidearm.nextgen.sites%2Fgomarquette.com%2Fimages%2F2025%2F3%2F13%2F20250313_MB_1001_AD.jpg&height=1100&type=webp"
            alt=""
          />
        </div>
      </div>
    </Section>
  );
};

export default PhotosPage;
