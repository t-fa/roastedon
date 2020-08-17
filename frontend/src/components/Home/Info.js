import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  margin: 0 auto;
  max-width: 95%;
`;

const Section = styled.div`
  background-color: ghostwhite;
  width: 80%;
  border-radius: 20px;
`;

const info = () => {
  return (
    <Section>
      <Container>
        <h3>Why Roasted On?</h3>
        <h4>We believe in the freshest coffee</h4>
        <p>
          Ordinary grocery store coffee comes with a "Best By" date, which is
          usually an arbitrary date. Often the "Best By" date is months after
          the coffee is roasted. Many coffee enthusiasts would consider such
          coffee to have gone bad. While the beans aren't expired in the
          traditional sense, they're past the point where they offer the
          freshest possible flavor. Roasters who use a "Roasted On" date believe
          in fresh coffee. A "Roasted On" date tells you exactly the day the
          coffee was roasted and allows you to enjoy the best possible cup.
        </p>

        <h4>Do I need to be a homebrewer to use this site?</h4>
        <p>
          No! Coffee shops that sell coffee with a "Roasted On" date believe in
          high quality coffee. If you're just stopping in for a coffee, you're
          likely to enjoy a great cup.
        </p>
      </Container>
    </Section>
  );
};

export default info;
