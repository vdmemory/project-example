import React from 'react';
import { StyledTermsOfUseStandard } from './TermsOfUseStandard.styled';

type Props = {
    role: 'agency' | 'client';
};

const TermsOfUseStandard: React.FC<Props> = ({ role }) => {
    return (
        <StyledTermsOfUseStandard>
            <h2>Breef’s Privacy policy</h2>
            <div>
                <p>
                    These “Standard Terms” are intended to be read in
                    conjunction with Breef’s Terms Of Use (
                    <a className="accent" href={`/${role}/terms-of-use`}>
                        www.breef.com/terms-of-use
                    </a>
                    ) and Privacy Policy (
                    <a className="accent" href={`/${role}/privacy-policy`}>
                        www.breef.com/privacy-policy
                    </a>
                    ). These Standard Terms are referred to in Breef’s Kickoff
                    Document.{' '}
                </p>

                <p>Both parties agree and acknowledge that:</p>

                <h3>1. Work.</h3>

                <p>
                    Breef does not participate in the execution of work on your
                    Project. Breef does not provide services to supervise or
                    manage your Project. Breef has no control over Clients or
                    Agency Talent, nor the work promised or rendered through any
                    relationship or agreed terms between Users.
                </p>

                <p>
                    As per Breef’s Terms of Use, both Parties agree to undertake
                    all work together through Breef for a period of 12 months
                    from the date of first signing a “Kickoff Document”. All
                    relevant terms, including fees (see 3 below) shall apply
                    during that 12 month period.
                </p>

                <h3>2. For Clients.</h3>

                <p>
                    You acknowledge that you have agreed to pay the Final
                    Project Price. Payments shall follow Payment Schedule, and
                    be made through Breef. Any additional scope of work shall be
                    notified to Breef at{' '}
                    <a className="accent" href="mailto:projects@breef.com">
                        projects@breef.com
                    </a>
                </p>

                <h3>3. For Agency Talent.</h3>

                <p>
                    You acknowledge that Breef shall deduct an Agency Talent Fee
                    from the Final Project Price (of 15%), as specified in
                    Breef’s Terms of Use. The Agency Talent Fee represents a fee
                    for introducing you to a Client and shall be payable
                    irrespective of whether a Project is completed.
                </p>

                <h3>4. Agreements.</h3>

                <p>
                    You shall provide Breef with a copy of any individual
                    agreements or statements of work relevant to the Project.
                </p>

                <h3>5. Required Terms.</h3>

                <p>
                    Both parties also agree and acknowledge that, in respect of
                    any agreement between Client and Agency Talent, any such
                    agreement contains terms and conditions substantially
                    similar to and at least as protective of Breef as the
                    following, provided that such terms do not constitute legal
                    advice from Breef, and that Clients and Agency Talent shall
                    consult independent counsel in drafting and negotiating any
                    such agreements:
                </p>

                <ol type="i">
                    <li>
                        Payments. Parties shall process all Project payments
                        through the Service using Breef's Payment Process. Breef
                        will disburse payments in accordance with instructions
                        of Clients and/or Agency Talent.
                    </li>
                    <li>
                        Third Party Beneficiary. In respect of any agreement
                        between Client and Agency Talent, Breef is an intended
                        third party beneficiary of each agreement and that Breef
                        has the right to enforce its rights and obligations
                        under such agreements on its own behalf.
                    </li>
                </ol>

                <p>
                    If there is a change to the summary of the Project as
                    reflected in the Kickoff Document, both parties shall be
                    required to inform Breef in writing at{' '}
                    <a className="accent" href="mailto:projects@breef.com">
                        projects@breef.com
                    </a>
                    .
                </p>

                <p>
                    Any additional work undertaken between parties introduced
                    through Breef’s Service shall be subject to the above
                    Standard Terms.
                </p>

                <p>
                    For any project questions, contact{' '}
                    <a className="accent" href="mailto:projects@breef.com">
                        projects@breef.com
                    </a>{' '}
                    For any payment questions - contact{' '}
                    <a className="accent" href="mailto:payments@breef.com">
                        payments@breef.com
                    </a>
                </p>
            </div>
        </StyledTermsOfUseStandard>
    );
};
export default TermsOfUseStandard;
