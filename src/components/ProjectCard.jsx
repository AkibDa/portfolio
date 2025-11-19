import PropTypes from 'prop-types';

export const ProjectCard = ({ title, description, link, tags }) => (
  <article className="card" data-animate-on-scroll>
    <header className="card_title">
      <h3>{title}</h3>
    </header>
    <p>{description}</p>
    <div className="tag-row">
      {tags.map((tag) => (
        <span key={tag} className="tag">
          {tag}
        </span>
      ))}
    </div>
    <div className="project-links">
      <a href={link} className="btn btn-primary" target="_blank" rel="noreferrer">
        Source Code
      </a>
    </div>
  </article>
);

ProjectCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string),
};

ProjectCard.defaultProps = {
  tags: [],
};

