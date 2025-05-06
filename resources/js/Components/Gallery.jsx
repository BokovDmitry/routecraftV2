import { useState } from 'react';
import '../../css/Gallery.css';
import gallery1 from '../../assets/gallery1.jpg';
import gallery2 from '../../assets/gallery2.jpg';
import gallery3 from '../../assets/gallery3.jpg';
import gallery4 from '../../assets/gallery4.jpg';
import gallery5 from '../../assets/gallery5.jpg';

function Gallery() {
  const [selected, setSelected] = useState(gallery1);

  return (
    <section className="gallery-section py-5 px-4">
      <div className="container">
        <h2 className="text-center mb-5 section-title">Moments from the Road</h2>

        <div className="d-flex justify-content-center mb-4">
          <img src={selected} alt="Selected" className="main-image shadow-sm" />
        </div>

        <div className="row justify-content-center g-3">
          {[gallery1, gallery2, gallery3, gallery4, gallery5].map((img, index) => (
            <div className="col-auto" key={index}>
              <img
                src={img}
                alt={`Gallery ${index + 1}`}
                className={`thumb-image shadow-sm ${selected === img ? 'active' : ''}`}
                onClick={() => setSelected(img)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Gallery;
