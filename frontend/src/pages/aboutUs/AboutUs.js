import "./AboutUs.css";

function AboutUs() {
  return (
    <div>
      <div className="container about-us">
        <div className="row">
          <h1 className="mt-4"> ABOUT US </h1>
          <p className="text-center">
            MELODICO merupakan platfrom streaming music
          </p>
        </div>
        <div className="row">
          <h1> THE TEAM </h1>
        </div>
        <div className="row content-team">
          <div className="col-sm-6 col-md-6 col-lg-3">
            <div>
              <img
                src="https://images.unsplash.com/photo-1644982647844-5ee1bdc5b114?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxzZWFyY2h8OHx8cGVyc29ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                alt=""
              />
            </div>
            <h4> Gilman Firdaus </h4> 
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt suscipit vel nam minus tenetur necessitatibus, corporis totam blanditiis sint earum provident culpa debitis similique ex, nihil eius excepturi expedita modi!</p>
          </div>
          <div className="col-sm-6 col-md-6 col-lg-3">
            <div>
              <img
                src="https://images.unsplash.com/photo-1517329782449-810562a4ec2f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8aW1hZ2V8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
                alt=""
              />
            </div>
            <h4> Reyshan Indradi </h4> 
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Distinctio recusandae sed, quidem iure nobis nostrum enim. Deserunt dolorem doloribus reprehenderit dolores unde velit sit, quod esse tenetur culpa provident enim.</p>
          </div>
          <div className="col-sm-6 col-md-6 col-lg-3">
            <div>
              <img
                src="https://images.unsplash.com/photo-1517329782449-810562a4ec2f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8aW1hZ2V8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
                alt=""
              />
            </div>
            <h4> Molly </h4>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam nostrum ipsam cumque distinctio ad quaerat tempora, enim numquam, delectus, quod at accusamus iste veritatis provident eligendi quae consequuntur itaque quo?</p>
          </div>
          <div className="col-sm-6 col-md-6 col-lg-3">
            <div>
              <img
                src="https://images.unsplash.com/photo-1517329782449-810562a4ec2f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8aW1hZ2V8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
                alt=""
              />
            </div>
            <h4> M Abdul Mukhid </h4>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perferendis repudiandae non architecto veniam eos quos voluptatum culpa libero sapiente cumque accusantium voluptates hic doloremque reiciendis numquam provident, earum praesentium harum.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;