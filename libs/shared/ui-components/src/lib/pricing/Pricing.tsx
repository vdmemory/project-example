import { StyledPricing } from './Pricing.styled';

export const Pricing = () => {
    return (
        <StyledPricing>
            <h2>Breef’s project pricing</h2>

            <div>
                <h3>1. HOW DOES PRICING WORK?</h3>
                <p>
                    Breef has built an ecosystem that simplifies outsourcing -
                    supported by the tools, teams, and dedicated curation needed
                    for your company’s projects. The following reflects Breef’s
                    role in seamlessly connecting Clients and Agency Talent.
                </p>
                <h3>2. MEMBERSHIP</h3>
                <p>
                    Breef is free to join. To become a Breef Member, choose from
                    various options on sign up for more premium levels of
                    Membership.
                </p>
                <h3>3. PROJECT CREDITS</h3>
                <p>
                    Tailored pitches are accessible by purchasing a Project
                    Credit ($499). A credit can be purchased within your
                    dashboard, ahead of posting your Brief. Contact your Curator
                    for Project Credit packages.
                </p>
                <h3>4. AGENCY TALENT FEE (15%)</h3>
                <p>
                    Agency Talent fee is payable by Agency Talent to Breef, and
                    deducted from the final project price.
                </p>
                <h3>5. PROJECT PAYMENTS</h3>
                <p>
                    Breef is your central point of agency spend. All project
                    payments are made through Breef. Once your project is ready
                    to commence, Breef will provide you with the necessary tools
                    to process payments. Parties can nominate when to release a
                    payment held by Breef.
                </p>

                <br />
            </div>

            <div style={{ fontSize: '16px', color: 'grey' }}>
                Last Updated: June 3, 2020
            </div>
        </StyledPricing>
    );
};
export default Pricing;
