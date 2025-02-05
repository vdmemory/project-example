import React from 'react';
import { StyledTermsOfUseProject } from './TermsOfUseProject.styled';

type Props = {
    role: 'agency' | 'client' | 'public';
};

const TermsOfUseProject: React.FC<Props> = ({ role }) => {
    return (
        <StyledTermsOfUseProject>
            <h2>Breef’s project terms</h2>

            <div className="terms-general">
                <p>
                    Congratulations on being invited to another great Breef
                    Project! Here’s some terms before you get started…
                </p>
                <br />
                <p>
                    By accessing and reviewing the following Project, you agree
                    that you have read and understand the Breef{' '}
                    <a className="accent" href={`/${role}/terms-of-use`}>
                        Terms of Use
                    </a>{' '}
                    and{' '}
                    <a className="accent" href={`/${role}/privacy-policy`}>
                        Privacy Policy
                    </a>
                    . Capitalized terms not defined herein shall take their
                    meaning from Breef Terms of Use.
                </p>

                <h3>SHORT VERSION (What you need to know)</h3>
                <p>
                    This is a Breef Project. That means - you agree to work
                    with, and pay this Client, through Breef. Breef’s Fees apply
                    to work you do with this Client, even if the scope of work
                    changes. <b>Note:</b> Only move forward if you agree to work
                    through Breef.
                </p>

                <h3>LONG VERSION (The legal)</h3>
                <p>You acknowledge, agree and understand the following:</p>
                <h3>1. HOW DOES THIS PROJECT WORK?</h3>

                <p>
                    This Project is a “Breef Project”. That means the Client has
                    come to Breef to find Agency Talent and that the Client
                    understands if they work with you/your agency, it must be
                    through the Breef Service. Under our Terms of Use, you
                    understand that:
                </p>
                <ol type="i">
                    <li>
                        Accessing the Project means you have been “Introduced”
                        through Breef;
                    </li>
                    <li>
                        Any work done with the Client will be processed through
                        Breef (including all contracts and payments); and{' '}
                    </li>
                    <li>
                        You agree not to work with the Client outside of Breef.
                    </li>
                </ol>

                <h3>2. PROJECT PITCH</h3>
                <p>
                    Submission of a Project Pitch through the Breef Service does
                    not guarantee acceptance by a Client to work on a Project,
                    nor does it constitute any agreement between you and a
                    Client.
                </p>
                <h3>3. PROJECT CONTRACT</h3>
                <p>
                    If selected by a Client, before commencing a project, you
                    will be required to complete a Project contract/agreement
                    for work on the Breef Service, which summarizes key terms of
                    work between a Client and Agency Talent. You will also be
                    required to provide any additional agreed terms between you
                    and the Client. You agree that you will not (and can not)
                    contract out of the Breef Terms of Use.
                </p>
                <h3>4. PAYMENTS AND NON-CIRCUMVENTION</h3>
                <p>
                    You are required to use the Breef Service for all payments
                    between you and the Client. You are subject to and agree to
                    the non-circumvention and disintermediation provisions in
                    the Breef Terms of Use. Broadly, going directly to a Client
                    is a massive ‘no’ - even if the scope of work changes. To be
                    clear - even if you agree to a different Project / scope of
                    work with a Client “Introduced” through Breef, that work is
                    still subject to the Breef Terms of Use.
                </p>
                <h3>5. BREEF FEES</h3>
                <p>
                    The{' '}
                    <a className="accent" href={`/${role}/terms-of-use`}>
                        Terms of Use
                    </a>{' '}
                    outline the Breef Fees.
                    <br />
                    By using the Service, you agree to pay any applicable Breef
                    Fees. These fees are payable when you are selected by a
                    Client to undertake a Project (Breef is paid 15% of the
                    total Project Price by the Agency) and/or any work between
                    you and a Client that you were “Introduced” to. Breef Fees
                    are payable on any payments requested by you to be paid by
                    the Client for a period of up to twelve (12) months. This
                    includes any future work between you and a Client
                    “Introduced” through Breef, even if it’s a different scope.
                </p>
                <h3>6. CONFIDENTIALITY</h3>
                <p>
                    Details provided in a Client’s Project brief are
                    confidential and are not to be disclosed or used for any
                    other purpose except submitting a Project Pitch through the
                    Breef Service. Under no circumstances are you to communicate
                    with a Client about a Project (or Introduction) without
                    Breef’s knowledge and express permission.
                </p>

                <h3>7. WHAT’S NEXT?</h3>

                <p>
                    By continuing to the Project Brief, you acknowledge that you
                    have read, understand, and agree to, the above Project
                    Terms.
                </p>
                <p>
                    For any questions, you can also email us at{' '}
                    <a className="accent" href="mailto:support@breef.com">
                        support@breef.com.
                    </a>
                </p>
                <br />
            </div>

            <div style={{ fontSize: '16px', color: 'grey' }}>
                Last Updated: March 22, 2023
            </div>
        </StyledTermsOfUseProject>
    );
};

export default TermsOfUseProject;
