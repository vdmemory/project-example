import React from 'react';
import { StyledTermsOfUseBreef } from './TermsOfUseBreef.styled';

type Props = {
    role: 'agency' | 'client' | 'public';
};

const TermsOfUseBreef: React.FC<Props> = ({ role }) => {
    return (
        <StyledTermsOfUseBreef>
            <h2>Breef’s Terms of Use</h2>
            <div className="terms-general">
                <h3>1. General</h3>
                <p>
                    Welcome to Breef.com, the website and online service of
                    Breef Inc. ("Breef" , <b>"we"</b>, or <b>"us"</b>). These
                    Terms of Use (<b>"Terms"</b>) are the terms by which you may
                    use our online services, website, software, and offline
                    services provided on or in connection with the service
                    (collectively the <b>"Service"</b>).{' '}
                </p>

                <p>
                    These Terms and the agreement thereto, applies to all
                    visitors, and users of the Service, as well as the{' '}
                    <a className="accent" href={`/${role}/privacy-policy`}>
                        Privacy Policy
                    </a>{' '}
                    and any other Breef policies you are provided from time to
                    time. All those who access the Service shall classify as
                    users (<b>"Users"</b>) irrespective of whether they are
                    approved to participate in the Service. Users are typically
                    referred to as <b>"Client"</b> or <b>"Agency Talent"</b>.
                    Clients or Agency Talent refer to those types of Users
                    irrespective of whether they have been approved as a “User”.
                    Even if you deactivate your Breef account, you may still be
                    classified as a User for a certain period of time after your
                    account is deactivated, as described in these Terms.
                </p>

                <p>
                    The use of the Service, either by access to the Service by
                    you or a representative of your company, or the process
                    whereby a User registers on behalf of a company, shall be
                    intended to also bind that company to these Terms, as though
                    the company itself was also a User. For the purpose of the
                    Terms, the registration of a company shall classify that
                    company as a User and bind it to the terms referred to
                    herein. An individual accessing the Service as a User shall
                    also have the requisite authority to act on behalf of the
                    company that it is registering on behalf of, and shall not
                    continue any further on the Service should the individual
                    not possess that requisite authority. The use of the term
                    “You” or “Your” within these Terms and throughout the
                    Service shall also apply to the company whom you are
                    representing.{' '}
                </p>

                <p>
                    BY ACCESSING OR USING THE SERVICE THROUGH ANY DIRECT OR
                    INDIRECT MEANS, CLICKING ANY SUBMISSION BUTTON OR CREATING
                    AN ACCOUNT, YOU SIGNIFY THAT YOU HAVE READ, UNDERSTOOD, AND
                    AGREE TO BE BOUND BY THESE TERMS, WHICH FORM A CONTRACT
                    BETWEEN YOU AND BREEF. YOU ALSO REPRESENT AND WARRANT THAT
                    YOU HAVE THE AUTHORITY TO BIND ANY COMPANY THAT YOU
                    REPRESENT IN USING THE SERVICE, AND UNDERSTAND THAT THE
                    COMPANY THAT YOU REPRESENT SHALL BE RESPONSIBLE FOR
                    COMPLYING WITH THE TERMS AND FOR A BREACH OF THIS AGREEMENT
                    BY ANY OF ITS REPRESENTATIVES. YOU ALSO CONSENT TO THE
                    COLLECTION AND USE OF YOUR INFORMATION AS SET FORTH IN THE
                    BREEF PRIVACY POLICY, WHETHER OR NOT YOU ARE AN APPROVED OR
                    REGISTERED USER OF OUR SERVICE.{' '}
                </p>

                <p>
                    The Terms shall also incorporate by reference all agreements
                    and policies referred to herein, including the Breef{' '}
                    <a className="accent" href={`/${role}/privacy-policy`}>
                        Privacy Policy
                    </a>{' '}
                    and other policies displayed by Breef or provided to you
                    from time to time. If you are based outside of the United
                    States, you consent to Breef storing, transferring and
                    processing your information (including your personal
                    information and content) in and out of the United States.
                </p>

                <p>
                    In using the Service, you agree that, in addition to these
                    Terms, you will use the Service in accordance with all
                    applicable laws and regulations.
                </p>

                <p>
                    Breef may, in its sole discretion, modify or update these
                    Terms, the{' '}
                    <a className="accent" href={`/${role}/privacy-policy`}>
                        Privacy Policy
                    </a>{' '}
                    and any other policies from time to time, and so you should
                    review this page, and those additional pages, on a frequent
                    basis. When we change the Terms in a material manner, we
                    will update the ‘Last Updated’ date on this page. Your
                    continued use of the Service after any such change
                    constitutes your acceptance of the revised Terms. If you do
                    not agree to these Terms or any future Terms, do not use or
                    access (or continue to access) the Service.
                </p>

                <p>
                    PLEASE READ THESE TERMS CAREFULLY TO ENSURE THAT YOU
                    UNDERSTAND EACH PROVISION. THESE TERMS CONTAIN A MANDATORY
                    ARBITRATION OF DISPUTES PROVISION THAT REQUIRES THE USE OF
                    ARBITRATION ON AN INDIVIDUAL BASIS TO RESOLVE DISPUTES,
                    RATHER THAN JURY TRIALS OR CLASS ACTIONS.
                </p>
                <h3>2. The Breef Service</h3>

                <h4>2.1 How the Service Works</h4>

                <p>
                    Breef connects Clients and their work <b>"Projects"</b> with
                    Agency Talent. A Project is either (i) a brief posted to the
                    Service, or (ii) any work undertaken between a Client and
                    Agency Talent following an "introduction" (defined herein).
                    The Service requires approval to register and participate
                    from our project managers. Projects are not automatically
                    approved. Agency Talent must also apply to participate in
                    the Service and cannot participate until approved by our
                    project managers. When approved, Agency Talent will be
                    eligible to be invited to provide <b>"Proposals"</b> to
                    undertake work on Projects for Clients. There is no
                    obligation upon a Client to accept a Proposal or to work
                    with Agency Talent.
                </p>

                <h4>2.2 What Breef Does</h4>

                <ol type="i">
                    <li>
                        We operate the online and offline features of the
                        Service. We are the administrator of the Service. We
                        facilitate introductions between Clients and Agency
                        Talent. Participation in the Service as User is at
                        Breef’s sole discretion.
                    </li>
                    <li>
                        We facilitate the payment process for your Project. All
                        payments must be processed through Breef.
                    </li>
                </ol>

                <h4>2.3 What Breef Does Not Do</h4>

                <ol type="i">
                    <li>
                        We do not make any representation (either express or
                        implied) as to the suitability, reliability, capability,
                        or qualifications of Agency Talent for a particular
                        Project. We do not endorse or make specific
                        recommendations about Agency Talent or Clients. We
                        merely facilitate the availability of information about
                        these Users.
                    </li>

                    <li>
                        We do not negotiate contracts, statements of work,
                        service agreements or other final project details and
                        specifications. This is a matter for Users to negotiate
                        amongst themselves.
                    </li>

                    <li>
                        We do not participate in the execution of work on your
                        Project. We are not a party to nor do we have any
                        liability with respect to any agreement between a Client
                        and Agency Talent. We do not provide services to
                        supervise or manage your project through Breef. We have
                        no control over Clients or Agency Talent, nor the work
                        promised or rendered through any relationship between
                        Users.
                    </li>

                    <li>Breef is not an agent for Clients or Agency Talent.</li>
                </ol>

                <h4>2.4 You Acknowledge and Agree</h4>

                <ol type="i">
                    <li>
                        {' '}
                        Breef reserves the right to select Agency Talent to
                        submit Proposals, and also to forward any Proposals to
                        you.
                    </li>

                    <li>
                        We are not responsible for who you select and contract
                        with to undertake work on your Project, or which Clients
                        and Projects you submit Proposals to.
                    </li>

                    <li>
                        Any agreement between you and another User or party
                        which seeks to alter or modify these Terms must be
                        agreed to in writing by Breef.
                    </li>

                    <li>
                        The Service is a place where Clients and Agency Talent
                        can connect and also facilitate payment for Projects.
                    </li>

                    <li>
                        Breef is not a party to any contract you may enter into
                        with another User and Breef shall not have any liability
                        or obligations whatsoever under such contracts.
                    </li>
                </ol>

                <h4>2.5 Our Requirements of Agency Talent</h4>

                <p>
                    Among other items in these Terms, and the Required Terms
                    (defined herein) we require that Agency Talent Users, and if
                    you are an Agency Talent User, you agree to only:
                </p>

                <ol type="i">
                    <li>
                        Undertake Projects that do neither present a conflict of
                        interest nor breach any duty that you have to existing
                        clients, service providers or other parties.
                    </li>

                    <li>
                        Undertake Projects that require skills in which you are
                        proficient, experienced with and have the requisite
                        knowledge to complete to the standard agreed between you
                        and the Client.
                    </li>
                </ol>
                <h3>3. Eligibility to Access the Service</h3>

                <h4>3.1 User Eligibility</h4>

                <p>In order to be eligible to use the Service, you:</p>

                <ol type="i">
                    <li>
                        Must be capable of forming legally binding contracts in
                        the jurisdiction in which you are using the Service;
                    </li>

                    <li>
                        Shall provide us with accurate information to create an
                        account, including your name and contact information, as
                        well as company information;
                    </li>

                    <li>
                        Represent and warrant that your company is not doing a
                        business in a country where use of the Service is
                        prohibited by law in your jurisdiction;
                    </li>

                    <li>
                        Represent and warrant that your company is not a citizen
                        of, or doing business in, a country or region subject to
                        US or other sovereign country sanctions or embargoes;
                    </li>

                    <li>
                        Must not be associated or doing business with any person
                        or entity identified by law, including US Government
                        lists such as the US Department of Commerce’s Denied
                        Person’s or Entry List, the US Department of Treasury’s
                        Specially Designated Nationals or Blocked Persons Lists,
                        or the Department of State’s Debarred Parties List, or
                        otherwise ineligible to receive items subject to US
                        export control laws and regulations, or other economic
                        sanction rules of any sovereign nation;
                    </li>

                    <li>
                        Confirm that you are not prohibited to participate in
                        the Service by any contract (such as employment,
                        confidentiality, service, or non-disclosure agreements)
                        or any similar obligations.
                    </li>
                </ol>

                <p>
                    Despite the foregoing, participation in the Service shall at
                    all times be at the sole discretion of Breef. If you or your
                    company’s User account was previously deactivated by Breef,
                    you are no longer permitted to, and must not use the Service
                    without the written authorization of Breef.
                </p>

                <h4>3.2 User Verification</h4>

                <p>
                    Breef reserves the right to validate your identity,
                    eligibility and account information at any time. Failure to
                    provide Breef with evidence to verify your account within a
                    timeframe requested by Breef may result in the suspension or
                    cancellation of your account.
                </p>

                <h4>3.3 Company Information</h4>

                <p>
                    By registering with the Service, you consent to us
                    displaying your company’s details in the Service. You also
                    consent to us displaying your company’s name, logo and other
                    relevant information within the Service. The fact that your
                    company is using the Service is not confidential information
                    and you consent to it being disclosed to other Users, and in
                    promotional materials advertising Breef and the Service,
                    including the use of your company name and logo for these
                    purposes. Breef shall not require additional consent to use
                    your company name and logo for the purposes outlined above.
                </p>

                <h4>3.4 Independent Contractor Status</h4>

                <p>
                    The relationship between Breef and User is that of
                    independent contractor. Nothing in these terms shall
                    construed as constituting a partnership or joint venture
                    among the parties hereto, or an employee-employer or agency
                    relationship. You agree and acknowledge that:
                </p>

                <ol type="i">
                    <li>You have no authority to act on behalf of Breef;</li>

                    <li>
                        We do not have a special relationship with you nor owe
                        you a fiduciary duty;
                    </li>

                    <li>
                        Neither Breef nor you shall have the right, power or
                        authority to enter into any agreement for, or on behalf
                        of, or incur any obligation or liability of, or
                        otherwise bind, each other.
                    </li>

                    <li>Breef is not an agent for Clients or Agency Talent.</li>
                </ol>

                <p>
                    As an independent contractor, you acknowledge that neither
                    you, employees, agents or anyone else at your company shall
                    be entitled to participate in or receive any compensation or
                    benefits from Breef whatsoever, including, without
                    limitation, worker’s compensation insurance, health
                    insurance or benefits, holiday pay, sick pay, bonuses,
                    salary or any other similar compensation or benefits.
                    Companies registered through the Service, as well as any
                    Users, are responsible for the compensation arrangements for
                    those who provide services to any User either by you, or on
                    your behalf.
                </p>

                <p>
                    Additionally, you are responsible for reporting to all
                    applicable government agencies, all amounts paid to
                    employees and agents of your company, including, without
                    limitation, payroll tax, unemployment insurance, Federal
                    insurance Contributions Act and Federal Unemployment Tax
                    Act. You are also responsible for compliance with all
                    applicable laws relating to employment, agency, contracting
                    etc., including those relating to workers’ compensation
                    insurance, reporting of independent contractors, issuance of
                    tax forms (including W-2 and 1099), the immigration Reform
                    Control Act, and equal opportunity laws.
                </p>

                <h4>3.5 Required Terms – Project Exhibit</h4>

                <p>
                    As a part of the Service, Breef manages all payments for
                    Projects. In order to facilitate payments, and maintain the
                    standard of the Service, Breef provides what we call a{' '}
                    <b>“Project Exhibit”</b> which contains{' '}
                    <b>“Required Terms”</b> terms that all Users must include
                    any contract for a Project.
                </p>

                <p>
                    Those terms do not constitute legal advice. Breef recommends
                    that Users obtain independent legal advice in drafting and
                    negotiating your Project contracts.
                </p>

                <p>You agree to:</p>

                <ol type="i">
                    <li>
                        Co-operate with Breef in completing the Project Exhibit
                        (which requires that you also provide us with payment
                        terms and other key Project information); and
                    </li>

                    <li>
                        Provide us with a copy of the completed Project Exhibit,
                        and any agreements and statements of work relevant to
                        your Project so that we can verify your compliance with
                        these Terms.
                    </li>
                </ol>
                <h3>4. Term</h3>

                <p>
                    Your continued access and use of the Service signifies your
                    acceptance of these Terms, and shall continue through the
                    maintenance of an account through the Breef website. Either
                    Breef or a User may terminate the Terms at any time, for any
                    reason, effective immediately, upon written notice to the
                    other party, or by deactivating or suspending your account.
                    Despite such termination, any agreements that exist between
                    a Client and Agency Talent shall remain unaffected by your
                    no longer maintaining an account on the Breef website.
                </p>

                <p>
                    Deactivation or suspension of your Breef account or notice
                    of termination of the Terms shall not relieve you of your
                    obligations with respect to non-circumvention of the Service
                    and payment exclusivity obligations as set forth in these
                    Terms, as well as any obligations that you owe to Breef
                    which are intended to survive beyond termination of the
                    Terms.
                </p>

                <p>
                    Clauses of the Terms which shall survive the termination of
                    these Terms include: 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14,
                    15, 16, 17 as well as any clauses by their nature are
                    intended to survive beyond termination of the Terms.
                </p>
                <h3>5. Payments</h3>

                <h4>5.1 Using the Service</h4>

                <p>Breef is free to join and access.</p>

                <p>
                    Breef’s <b>“Fees”</b> are charged on either a (i) Project
                    basis or (ii) a <b>“Placement”</b> – when you hire someone
                    to work for your company after they were introduced to you
                    or your company through the Service.
                </p>

                <p>
                    As a part of the Service, you and your company agree to pay
                    the Fees in accordance with the Terms, and agree that they
                    are fair and reasonable. All fees are non-cancelable and
                    non-refundable.
                </p>

                <p>Under these Terms,</p>

                <ol type="i">
                    <p>
                        <b>“Work Fees”</b> refer to the total fees payable by a
                        Client to Agency Talent for a Project, inclusive of
                        bonuses or other incentive payments (i.e. the total
                        amount).
                    </p>

                    <p>
                        <b>
                            “Initial Deposit” payments refer to the initial
                            payment made by a Client prior to the
                        </b>{' '}
                        commencement of a project, which shall total at least
                        thirty percent (30%) of the Work Fees
                    </p>
                </ol>

                <p>
                    For the purpose of these Terms, being “introduced” or an
                    “introduction” shall include any circumstance under which a
                    User becomes aware of another User through interaction with
                    the Service.
                </p>

                <ol type="i">
                    <li>
                        {' '}
                        A Client posts a brief to which Agency Talent identifies
                        the client (irrespective of whether the Agency Talent
                        submits a proposal);
                    </li>

                    <li>
                        {' '}
                        A Client posts a brief and becomes aware of Agency
                        Talent (irrespective of whether the Agency Talent
                        submits a proposal);
                    </li>

                    <li>
                        {' '}
                        A Client posts a brief to which Agency Talent identifies
                        the client (irrespective of whether the Agency Talent
                        submits a proposal);
                    </li>

                    <li>
                        {' '}
                        A Client and or Agency Talent communicate outside of the
                        Service; or
                    </li>

                    <li>
                        {' '}
                        Any other circumstance that Breef reasonably expects
                        shall be subject to Breef Fees within the spirit of the
                        Terms of Use.
                    </li>
                </ol>

                <h4>5.2 Types of Fees Payable to Breef</h4>

                <p>
                    Fees payable to Breef <b>“Breef Fees”</b> are as follows:
                </p>

                <ol type="i">
                    <li>
                        <b>Project Fees</b> – where Clients and Agency Talent
                        pay a fee to Breef on a Project basis, which is a
                        proportion of the Work Fees; and
                    </li>

                    <li>
                        <b>Placement Fees</b> – where Breef is paid a fee, by
                        the hiring party, for hiring a Breef User, or person
                        introduced through the Service, to work for a company,
                    </li>
                </ol>

                <p>
                    each being a “Breef Fee” depending on whether a Project or
                    Placement is being undertaken.
                </p>

                <h4>5.3 How Project Fees are Calculated</h4>

                <p>
                    Prior to the commencement of work on a Project, Client and
                    Agency Talent must notify Breef of the key terms relating to
                    the Project (including dates, milestones, fees payable to
                    Agency Talent etc), and also provide Breef with any relevant
                    and/or signed documentation (service agreements, contracts,
                    statements of work etc). Client and Agency Talent shall
                    negotiate and agree Work Fees.
                </p>

                <p>
                    The following Fees are payable to Breef per Project,
                    comprising the “Project Fees”:
                </p>

                <ol type="i">
                    <li>
                        <span className="underline">
                            <b>Agency Talent Fee</b>
                        </span>

                        <p>
                            15% of the Work Fees shall be paid to Breef. This{' '}
                            <b>“Agency Talent Fee”</b> shall be deducted from
                            the initial deposit payment paid by a Client to
                            Breef. The Agency Talent Fee is payable to Breef
                            over the first twelve (12) months from the first
                            project commencing between the Client and Agency
                            Talent introduced through the Service. In the event
                            that Work Fees are (a) payable on a monthly
                            retainer, or (b) increase, the Agency Talent Fee
                            shall be payable over the course of all work
                            undertaken between the Client and Agency Talent.
                        </p>
                    </li>

                    <li>
                        <span className="underline">
                            <b>Client Fee</b>
                        </span>

                        <p>
                            A Fee is payable by the Client to Breef of 5% on top
                            of the Work Fees <b>“Client Fee”</b>.
                        </p>

                        <p>
                            Breef Fees for a Project shall be payable
                            irrespective of whether a Project is completed to
                            the Client’s satisfaction.
                        </p>

                        <p>
                            You acknowledge, understand and agree that these
                            Terms contain provisions which require that Breef
                            Fees be paid for a period of time for all work
                            undertaken by Agency Talent for Clients introduced
                            through the Service, irrespective of whether those
                            parties remain Users.
                        </p>
                    </li>
                </ol>

                <h4>5.4 How Placement Fees are Calculated</h4>

                <p>
                    Breef shall be paid a Placement Fee equal to twenty percent
                    (20%) of the first year’s salary (bonus and incentives
                    inclusive) for each individual hire made by a company to
                    whom an introduction was made through the Service.
                </p>

                <h4>5.5 Payment of Work Fees and Breef Fees</h4>

                <p>
                    For Projects, Users are required to process all Project
                    payments (i.e. the payments from a Client to Agency Talent,
                    the total of which comprise Work Fees) through the Service.
                    Our project managers will assist in coordination of the
                    payment process once Clients and Agency Talent have agreed
                    terms for a Project. Breef will disburse Work Fees in
                    accordance with the instructions of Clients (and, where
                    applicable, Agency Talent). By using the Service, you
                    authorize Breef to manage process Breef Fees by deducting
                    amounts from Work Fee payments for your Project. You also
                    authorize Breef to process payments for any work undertaken
                    with parties to whom you were introduced through the
                    Service. In cases of fraud, abuse or violation of these
                    Terms, Breef reserves the right to setoff against any
                    amounts due to you through the Service any damages or costs
                    the Company incurs as a result of such fraud, abuse or
                    violation.
                </p>

                <p>
                    In the case of a Placement, you will pay the hired worker(s)
                    through your company, and any Placement Fees will be
                    invoiced to your company by Breef and payable within
                    fourteen (14) days of receipt of such invoice.
                </p>

                <p>
                    Please note the non-circumvention and disintermediation
                    provisions in these Terms. Any violation of these Terms
                    where you encourage or solicit any payments between Users
                    outside of the Service is a breach of these Terms and will
                    result in additional Fees being charged and liquidated
                    damages being payable by the parties in breach.
                </p>

                <p>
                    Failure to pay Agency Talent through the Service in
                    accordance with an agreed payment schedule may result in the
                    offending User(s) being removed from the Service and
                    additional enforcement proceedings.
                </p>

                <p>
                    We do not hold funds on a Client’s behalf for more than
                    thirty (30) days. Any payments made to Breef which are not
                    applied to a Project or released to a Client within ninety
                    (90) days of being paid to Breef shall be considered
                    abandoned <b>“Abandoned Funds”</b>. Abandoned funds shall
                    become the property of Breef ninety (90) days after being
                    paid to Breef, with no refunds permitted or other
                    application to existing or future Projects or other Client
                    spend through Breef under any circumstances. For the
                    avoidance of doubt, Abandoned Funds are the property of
                    Breef and cannot be used for future credit through Breef or
                    any other purpose.
                </p>

                <h4>5.6 Taxes</h4>

                <p>
                    Breef is a third party processor. Pursuant to Section 6050W
                    of the Internal Revenue Code, we will provide a 1099-K form
                    to the Internal Revenue Service for any Agency Talent based
                    in the United States who is paid over $20,000 through the
                    Service and participates in over 200 Projects in a calendar
                    year.
                </p>

                <p>
                    Other than as stated above, Breef has no responsibility for
                    determining whether Users are required to submit tax forms.
                    Breef will not (except as stated above) issue tax forms, and
                    is not responsible for determining, remitting or withholding
                    any taxes applicable to Work Fees and other Fees under the
                    Service. You will be solely responsible for determining,
                    remitting, or withholding any taxes applicable to Work Fees
                    and other Fees under the Service, and you will be solely
                    responsible for determining whether you are required by
                    applicable law to file any tax forms or remit to the
                    appropriate authorities any taxes or similar charges
                    applicable. You are also responsible for the filing of any
                    such tax forms and remitting any such taxes or charges to
                    the appropriate authorities.
                </p>
                <h3>6. Introductions, Non-Circumvention and Audit Rights</h3>

                <h4>6.1 Obligation to Use the Service</h4>

                <p>
                    To ensure that the Service functions as intended, when Users
                    are introduced to each other through the Service, they agree
                    that they must follow our Project and payment procedures and
                    terms.
                </p>

                <p>
                    From the moment you register as a User and for twelve (12)
                    months after you terminate these Terms, or your account is
                    suspended or deactivated, you agree not to:
                </p>

                <ol type="i">
                    <li>
                        Enter into agreement to become an employee of another
                        User or other party to whom you were introduced through
                        the Service;
                    </li>

                    <li>
                        Enter into an agreement to provide services for another
                        User, User company, any affiliates (whether individually
                        or through engagement of a third party or other entity),
                        or other party, where you and the other User(s) or other
                        party have been introduced through the Service; or
                    </li>

                    <li>
                        Approach, solicit, induce, entice, offer to perform
                        services, receive services, consult with or for, or
                        otherwise be engaged for reward (directly or indirectly)
                        with any User introduced through the Service, in any
                        other way than through the Service,
                    </li>
                </ol>

                <p>
                    without complying with the Project payment processes and
                    procedures, payment of Breef Fees, and other applicable
                    clauses of these Terms.
                </p>

                <h4>6.2 Disintermediation</h4>

                <p>
                    You agree to use the Service as your exclusive method to
                    engage with other Users and parties to whom you were
                    introduced through the Service, unless Breef agrees in
                    writing.
                </p>

                <p>
                    You agree not to provide or receive services with or from
                    other Users (or other parties to whom you were introduced
                    through the Service) without processing all payments for
                    work with those Users/parties and without engaging each
                    other through the Service. We call this “disintermediation”.
                    Not only can it result in you and your company being
                    permanently banned from Breef, it means you are not
                    protected by the Service’s features and will be liable to
                    Breef for Fees, liquidated damages, and other enforcement
                    action.
                </p>

                <p>
                    These obligations apply regardless of whether or not you and
                    the other User(s) or parties had worked together previously
                    or had any prior relationship.
                </p>

                <p>
                    Any action encouraging or soliciting payments outside of the
                    Service is a violation of these Terms. You must notify us
                    immediately if you are approached to perform or receive
                    services outside of the Service. You also agree to
                    accurately report all amounts paid between you and other
                    parties introduced to you through the Service (whether Users
                    or otherwise). Even if you have already engaged, contracted
                    or retained a User or other such party outside of the
                    Service, you must notify us in writing that this has
                    occurred. You must also notify us if another User or party
                    to whom you were introduced through the Service proposes
                    making payments outside of the Service. Your failure to
                    notify us may result in us enforcing our rights under these
                    Terms, and you and your company being permanently banned
                    from Breef.
                </p>

                <h4>6.3 Audit Rights</h4>

                <p>
                    You acknowledge that an important part of maintaining the
                    integrity of the Service is ensuring that Breef can enforce
                    its rights in relation to exclusivity and non-circumvention
                    of the Service.
                </p>

                <p>You agree to:</p>

                <ol type="i">
                    <li>
                        create and maintain records to document satisfaction of
                        your obligations under these Terms, as well as any
                        contract for services that you enter; and
                    </li>
                    <li>
                        provide copies of such records to Breef upon request.
                    </li>
                </ol>

                <p>
                    Furthermore, you agree (whether or not registered with the
                    Service) to maintain such records for a period of three (3)
                    years following termination of the Terms, or suspension or
                    deactivation of your account.
                </p>

                <p>
                    Breef, and any third party engaged by Breef (inclusive of
                    its advisors and agents) shall have the right to routinely,
                    up to a maximum of three (3) occasions annually, audit a
                    User’s operations and financial records to the extent
                    required to confirm compliance with the Terms. Such audit
                    rights extend to both Clients and Agency Talent, whether or
                    not they continue to maintain a Breef account. Audit rights
                    shall last for a period of three (3) years following the
                    termination of the Terms, or suspension or deactivation of
                    your Breef account.
                </p>

                <p>
                    Nothing in this clause should be construed as providing
                    Breef with the right or obligation to supervise or monitor
                    the activities of services performed by Users, or former
                    “Users” of the Service, as the case may be.
                </p>

                <h4>6.4 Additional Fees</h4>

                <p>
                    You agree that if Breef discovers under an audit in
                    accordance with clause 6.3 or other means, that you have
                    breached the Fee payment obligations of these terms, and
                    that we are owed Fees by you under these Terms, we shall
                    invoice you, and you agree to pay, as liquidated damages in
                    respect of such breach:
                </p>

                <ol type="i">
                    <li>
                        Fees equal to twice (2x) the Breef Fees payable that you
                        would otherwise have been required to pay if you had
                        complied with your Fee payment obligations through the
                        Service; and
                    </li>

                    <li>
                        All of our reasonable expenses (legal, accounting,
                        advisor and otherwise) in recovering any amounts owed to
                        Breef under this clause,
                    </li>
                </ol>

                <p>
                    (constituting a <b>“Fee Event”</b>).
                </p>

                <p>
                    In addition, you agree that Breef shall be entitled to
                    interest of ten percent (10%) per annum for all Fees owing
                    under a Fee Event, or the maximum interest allowed under the
                    applicable state law, calculated from the earlier of (i) the
                    date any qualifying service commenced and (ii) the date of
                    termination of the Terms or suspension or deactivation of
                    your Breef account (if applicable).
                </p>

                <p>
                    You acknowledge and agree that amounts payable under a Fee
                    Event are not a penalty, but rather a reasonable measure of
                    damages payable to Breef. You agree that the foregoing is in
                    addition to all other remedies Breef may have against you
                    for any such breach, including remedies under law and
                    equity.
                </p>

                <p>
                    Any parties subject to a Fee Event shall be permanently
                    banned from the Service, unless otherwise agreed in writing
                    by Breef. A Fee Event shall apply to all parties the subject
                    of a transaction constituting a Fee Event, irrespective of
                    whether they are, at that time, a User of the Service.
                </p>

                <h4>6.5 Summary</h4>

                <p>For the avoidance of doubt, in relation to this clause 6:</p>

                <ol type="i">
                    <li>
                        You accept and acknowledge that your obligations under
                        these Terms, including this clause (around
                        introductions, non-solicitation and audit rights) are
                        reasonable in every respect.
                    </li>

                    <li>
                        You will continue to use Breef to process payments for
                        Projects and other work undertaken by parties introduced
                        to you through the Service.
                    </li>

                    <li>
                        It is immaterial whether you continue to be a registered
                        User of the Service and subsequently engage a User
                        (Client or Agency Talent) or former “User” outside of
                        these Terms. The intention of these Terms are that you
                        are required to continue to use Breef for twelve (12)
                        months following termination of your account where you
                        seek to engage or contract with parties or Users or
                        other parties introduced to you through the Service.
                    </li>

                    <li>
                        Breef does not need to suffer or prove any demonstrated
                        loss before enforcing its rights under the Terms.
                    </li>

                    <li>
                        After the aforementioned twelve (12) month period has
                        ended, you are free to deal directly with parties or
                        Users that you have been introduced to outside of the
                        Service and independently from these Terms.
                    </li>
                </ol>
                <h3>7. Warranty Disclaimer</h3>

                <p>
                    Breef facilitates the provision of options for Projects,
                    Proposals, Clients and Agency Talent. Those options are by
                    no means exhaustive as to what exists in the market that you
                    operate within.
                </p>

                <p>
                    We provide access to technology, relationships and payment
                    processing. The decisions relating to work, however, are
                    solely up to you.
                </p>

                <p>We do not:</p>

                <ol type="i">
                    <li>
                        Decide who you should work, partner or undertake a
                        Project with.
                    </li>
                    <li>
                        Make any decisions relating to agreements that you enter
                        into.
                    </li>
                    <li>
                        Have any role to play in the execution of work relating
                        to your project.
                    </li>
                    <li>
                        Make representations as to the suitability of our
                        technology or the connections made herein, for you, your
                        business or your project’s needs.
                    </li>
                    <li>
                        Take into account any Client or Agency Talent’s
                        individual circumstances when providing the Services.
                    </li>
                </ol>

                <p>
                    THE SERVICE IS PROVIDED ON AN “AS IS” AND “AS AVAILABLE”
                    BASIS. USE OF THE SERVICE IS AT YOUR OWN RISK. NOTHING IN
                    THE SERVICE CONSTITUTES PROFESSIONAL OR OTHER ADVICE, NOR
                    ADVICE IN RELATION TO THE SUITABILITY OF A CLIENT OR AGENCY
                    TALENT OR ANOTHER PARTY. TO THE MAXIMUM EXTENT PERMITTED BY
                    APPLICABLE LAW, THE SERVICE IS PROVIDED WITHOUT WARRANTIES
                    OF ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING, BUT NOT
                    LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS
                    FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT. WITHOUT
                    LIMITING THE FOREGOING, Breef, ITS SUBSIDIARIES, ITS
                    AFFILIATES, AND ITS LICENSORS DO NOT WARRANT THAT THE
                    CONTENT IS ACCURATE, RELIABLE OR CORRECT; THAT THE SERVICE
                    WILL MEET YOUR REQUIREMENTS; THAT THE SERVICE WILL BE
                    AVAILABLE AT ANY PARTICULAR TIME OR LOCATION, UNINTERRUPTED
                    OR SECURE; THAT ANY DEFECTS OR ERRORS WILL BE CORRECTED;
                    THAT WE WILL PRESERVE OR MAINTAIN USER INFORMATION WITHOUT
                    LOSS; OR THAT THE SERVICE IS FREE OF VIRUSES OR OTHER
                    HARMFUL COMPONENTS. ANY CONTENT DOWNLOADED OR OTHERWISE
                    OBTAINED THROUGH THE USE OF THE SERVICE IS DOWNLOADED AT
                    YOUR OWN RISK AND YOU WILL BE SOLELY RESPONSIBLE FOR ANY
                    DAMAGE TO YOUR COMPUTER SYSTEM OR LOSS OF DATA THAT RESULTS
                    FROM SUCH DOWNLOAD OR YOUR USE OF THE SERVICE.
                </p>

                <p>
                    BREEF DOES NOT WARRANT, ENDORSE, GUARANTEE, OR ASSUME
                    RESPONSIBILITY FOR ANY PRODUCT OR SERVICE ADVERTISED OR
                    OFFERED BY A USER THROUGH THE SERVICE OR ANY HYPERLINKED
                    WEBSITE OR SERVICE, AND BREEF WILL NOT BE A PARTY TO OR IN
                    ANY WAY MONITOR ANY PROJECT OR OTHER WORK BETWEEN CLIENTS
                    AND AGENCY TALENT OR ANY THIRD PARTY PROVIDERS OF PRODUCTS
                    OR SERVICES. THROUGH YOUR USE OF THE SERVICE, YOU MAY HAVE
                    OPPORTUNITIES TO ENGAGE IN COMMERCIAL TRANSACTIONS WITH
                    USERS AND THIRD PARTIES. YOU ACKNOWLEDGE THAT ALL
                    TRANSACTIONS RELATING TO ANY PRODUCTS OR SERVICES OFFERED BY
                    ANY USER OR THIRD PARTY, INCLUDING, BUT NOT LIMITED TO THE
                    PURCHASE AND/OR SERVICE TERMS, PAYMENT TERMS, WARRANTIES,
                    GUARANTEES, MAINTENANCE AND DELIVERY TERMS RELATING TO SUCH
                    TRANSACTIONS, ARE AGREED TO SOLELY BETWEEN THE SELLER OR
                    PURCHASER OF SUCH PRODUCTS AND SERVICES AND YOU. WE MAKE NO
                    WARRANTY REGARDING ANY TRANSACTIONS EXECUTED THROUGH, OR IN
                    CONNECTION WITH THIS SITE, WITH ANY USER OR THIRD PARTY AND
                    YOU UNDERSTAND AND AGREE THAT SUCH TRANSACTIONS ARE
                    CONDUCTED ENTIRELY AT YOUR OWN RISK. ANY WARRANTY THAT IS
                    PROVIDED IN CONNECTION WITH ANY PRODUCTS, SERVICES,
                    MATERIALS, OR INFORMATION AVAILABLE ON OR THROUGH THIS SITE
                    FROM A USER OR THIRD PARTY IS PROVIDED SOLELY BY SUCH USER
                    OR THIRD PARTY, AND NOT BY US OR ANY OTHER OF OUR
                    AFFILIATES.
                </p>

                <p>
                    The Service is controlled and operated from facilities in
                    the United States. Breef makes no representations that the
                    Service is appropriate or available for use in other
                    locations. Those who access or use the Service from other
                    jurisdictions do so at their own discretion and are entirely
                    responsible for compliance with all applicable United States
                    and local laws and regulations, including but not limited to
                    export and import regulations. You may not use the Service
                    if you are a resident of a country embargoed by the United
                    States, or are a foreign person or entity blocked or denied
                    by the United States government.
                </p>

                <p>
                    The Service may be subject to delays, limitations and other
                    problems relating to the use of internet and electronic
                    communications. Breef is not responsible for any delays,
                    delivery failure or other damages whatsoever resulting from
                    such internet, technology or electronic communications
                    problems.
                </p>
                <h3>8. Service Content and Proprietary Rights</h3>

                <h4>8.1 User Content</h4>

                <p>
                    The Service allows Users to post content such as profile
                    information, comments, questions, and other content or
                    information (any such materials a User submits, posts,
                    displays, or otherwise makes available on the Service “User
                    Content”). The User Content you create remains yours;
                    however, by sharing User Content through the Service, you
                    agree to allow others to view, edit, and/or share your User
                    Content in accordance with your settings and this Agreement.
                    Breef has the right (but not the obligation) in its sole
                    discretion to remove any User Content that is shared via the
                    Service.
                </p>

                <p>
                    You agree not to post User Content that: (a) may create a
                    risk of harm, loss, physical or mental injury, emotional
                    distress, death, disability, disfigurement, or physical or
                    mental illness to you, to any other person, or to any
                    animal; (b) may create a risk of any other loss or damage to
                    any person or property; (c) seeks to harm or exploit
                    children by exposing them to inappropriate content, asking
                    for personally identifiable details or otherwise; (d) may
                    constitute or contribute to a crime or tort; (e) contains
                    any information or content that we deem to be unlawful,
                    harmful, abusive, racially or ethnically offensive,
                    defamatory, infringing, invasive of personal privacy or
                    publicity rights, harassing, humiliating to other people
                    (publicly or otherwise), libelous, threatening, profane, or
                    otherwise objectionable; (f) contains any information or
                    content that is illegal (including, without limitation, the
                    disclosure of insider information under securities law or of
                    another party’s trade secrets); (g) contains any information
                    or content that you do not have a right to make available
                    under any law or under contractual or fiduciary
                    relationships; or (h) contains any information or content
                    that you know is not correct and current.
                </p>

                <p>You also must not:</p>

                <ol type="i">
                    <li>
                        Undertake any conduct which interferes with or disrupts
                        the operation of the Service, or the businesses of
                        Clients and Agency Talent;
                    </li>

                    <li>
                        Uses the information or details of other Users in a
                        manner not expressly authorized by those Users, or the
                        Service;
                    </li>

                    <li>
                        Copy, collect, save information about other Users except
                        for the purpose of completing a specific Project;
                    </li>

                    <li>
                        Sell, redistribute, or use information you access
                        through the Service for a commercial purpose without the
                        prior written consent of Breef;
                    </li>

                    <li>
                        Market goods or services directly to other Users in a
                        manner not contemplated by these Terms;
                    </li>

                    <li>
                        Introduce any malicious code or other program (including
                        viruses, Trojan horses or worms) which may damage the
                        Service, or the computers or services of another User or
                        third party;
                    </li>

                    <li>Stalk, harass or otherwise intimidate anyone;</li>

                    <li>
                        Breach the trademark, copyright, patent or intellectual
                        property rights of any party;
                    </li>

                    <li>
                        Make any misleading or deceptive statement, act, or
                        omission through the Service or otherwise;
                    </li>

                    <li>
                        Impersonate anyone or create a fictitious person or
                        pseudonym/alternate identity;
                    </li>

                    <li>
                        Attempt to disassemble, decompile, decipher or otherwise
                        reverse engineer the Service (including any software or
                        code comprising the Service);
                    </li>

                    <li>
                        Link any external website through your User Content or
                        any Project or Proposal, or any other feature of the
                        Service, unless we have otherwise given you our prior
                        written consent.
                    </li>

                    <li>
                        Undertake any activity which is considered, or is
                        similar to, spam, unsolicited mass email; and
                    </li>

                    <li>
                        Distribute or publish any content, information or part
                        of the Service on any publicly accessible electronic
                        network, including any online (worldwide web/internet)
                        site, social media site, or any broadcast or publicly
                        available forum.
                    </li>
                </ol>

                <p>
                    You agree that any User Content that you post does not and
                    will not violate third party rights of any kind, including
                    without limitation any Intellectual Property Rights (as
                    defined below) or rights of privacy. Breef reserves the
                    right, but is not obligated, to reject and/or remove any
                    User Content that Breef believes, in its sole discretion,
                    violates these provisions. You understand that publishing
                    your User Content on the Service is not a substitute for
                    registering it with the U.S. Copyright Office, the Writer’s
                    Guild of America, or any other rights organization.
                </p>

                <p>
                    Breef does not, nor are we under any obligation or duty to
                    you or anyone else, to review, consider, monitor, evaluate,
                    censor or remove any User Content. Breef does not have (and
                    expressly disclaims) any liability in connection with the
                    User Content.
                </p>

                <p>
                    For the purposes of these Terms, “Intellectual Property
                    Rights” means all patent rights, copyright rights, mask work
                    rights, moral rights, rights of publicity, trademark, trade
                    dress and service mark rights, goodwill, trade secret rights
                    and other intellectual property rights as may now exist or
                    hereafter come into existence, and all applications
                    therefore and registrations, renewals and extensions
                    thereof, under the laws of any state, country, territory or
                    other jurisdiction.
                </p>

                <h4>
                    8.2 Representations and Warranties in Relation to User
                    Content
                </h4>

                <p>
                    In connection with your User Content, you affirm, represent
                    and warrant the following:
                </p>

                <ol type="i">
                    <li>
                        You have the written consent of each and every
                        identifiable natural person in the User Content to use
                        such person’s name or likeness in the manner
                        contemplated by the Service and this Agreement, and each
                        such person has released you from any liability that may
                        arise in relation to such use.
                    </li>

                    <li>
                        Your User Content and Breef’s use thereof as
                        contemplated by this Agreement and the Service will not
                        violate any law or infringe any rights of any third
                        party, including but not limited to any Intellectual
                        Property Rights and privacy rights.
                    </li>

                    <li>
                        Breef may exercise the rights to your User Content
                        granted under this Agreement without liability for
                        payment of any guild fees, residuals, payments, fees, or
                        royalties payable under any collective bargaining
                        agreement or otherwise.
                    </li>

                    <li>
                        To the best of your knowledge, all your User Content and
                        other information that you provide to us is truthful and
                        accurate. Breef takes no responsibility and assumes no
                        liability for any User Content that you or any other
                        User or third party posts or sends over the Service. You
                        shall be solely responsible for your User Content and
                        the consequences of posting or publishing it, and you
                        agree that we are only acting as a passive conduit for
                        your online distribution and publication of your User
                        Content. You understand and agree that you may be
                        exposed to User Content that is inaccurate,
                        objectionable, inappropriate for children, or otherwise
                        unsuited to your purpose, and you agree that Breef shall
                        not be liable for any damages you allege to incur as a
                        result of User Content.
                    </li>

                    <li>
                        Your User Content is not misleading, deceptive or
                        materially inaccurate in any way. Information that you
                        provide in relation to the services being sought, as
                        well as Project and Proposal details, are accurate and
                        will assist other Users in participating in the Service.
                    </li>
                </ol>

                <p>
                    Breef reserves the right to keep User Content posted on the
                    Service indefinitely unless otherwise removed by a User. You
                    acknowledge and agree that Breef may preserve and/or
                    disclose your User Content if required to do so by law, or
                    if it believes in good faith that such preservation or
                    disclosure is reasonably necessary to ensure compliance with
                    and/or enforcement of these Terms, or to comply with any
                    applicable law or government request.
                </p>

                <p>
                    Breef is not responsible for any advice, opinions,
                    statements or representations made by Clients (in relation
                    to Projects) or Agency Talent in relation to their skill,
                    quality of work or ability to complete a Project. Breef
                    shall have no liability in relation to your communications
                    and other interactions with any User. We do not endorse any
                    User Content nor any communications or other interactions
                    with or information provided by any other User.
                </p>

                <p>
                    YOU ARE SOLELY RESPONSIBLE FOR ALL OF YOUR USER CONTENT.
                    BREEF SHALL NOT HAVE, AND EXPRESSLY DISCLAIMS, ANY LIABILITY
                    TO YOU IN RELATION TO ANY USER CONTENT OR OTHER MATERIAL
                    ACCESSED THROUGH THE SERVICE. BREEF CAN NOT GUARANTEE, AND
                    MAKES NO REPRESENTATIONS IN RELATION TO, THE COMPLETENESS OR
                    ACCURACY OF ANY USER CONTENT OR OTHER MATERIALS ACCESSED
                    THROUGH THE SERVICE.
                </p>

                <p>
                    IN RELATION TO YOUR USER CONTENT, YOU AGREE THAT YOU ARE
                    SOLELY RESPONSIBLE FOR YOUR USER CONTENT, AND AGREE TO
                    INDEMNIFY BREEF, AND KEEP US INDEMNIFIED, FOR AND AGAINST
                    ALL CLAIMS, COSTS, DAMAGE LOSS OR LIABILITY THAT MAY ARISE
                    IN CONNECTION WITH YOUR USER CONTENT. BREEF WILL NOT BE
                    LIABLE FOR THE DELETION, LOSS, OR MODIFICATION (WHETHER
                    AUTHORIZED OR NOT) OF YOUR USER CONTENT. YOU ARE NOT
                    PERMITTED TO USE ANY USER CONTENT OR CONTENT OTHERWISE
                    ACCESSED THROUGH THE SERVICE FOR ANY PURPOSE OTHER THAN THE
                    INTENDED USE OF THE SERVICE.
                </p>

                <h4>8.3 User Content License Grant</h4>

                <p>
                    By posting any User Content on the Service, you expressly
                    grant, and you represent and warrant that you have all
                    rights necessary to grant, to Breef a royalty-free,
                    sublicensable, transferable, perpetual, irrevocable,
                    non-exclusive, worldwide license to use, reproduce, modify,
                    publish, list information regarding, edit, translate,
                    distribute, syndicate, publicly perform, publicly display,
                    and make derivative works of all such User Content and your
                    name, voice, and/or likeness as contained in your User
                    Content, in whole or in part, and in any form, media or
                    technology, whether now known or hereafter developed, for
                    use in connection with the Service and Breef’s (and its
                    successors’ and affiliates’) business, including without
                    limitation for promoting and redistributing part or all of
                    the Service (and derivative works thereof) in any media
                    formats and through any media channels. You also hereby
                    grant each User of the Service a non-exclusive license to
                    access your User Content through the Service, and to use,
                    reproduce, distribute, display and perform such User Content
                    as permitted through the functionality of the Service and
                    under these Terms.
                </p>

                <h4>8.4 Our Proprietary Rights</h4>

                <p>
                    Except for your User Content, the Service and all materials
                    therein or transferred thereby, including, without
                    limitation, software, images, text, graphics, illustrations,
                    logos, patents, trademarks, service marks, copyrights,
                    photographs, audio, videos, music, and User Content
                    belonging to other Users (the “Breef Content”), and all
                    Intellectual Property Rights related thereto, are the
                    exclusive property of Breef and its licensors (including
                    other Users who post User Content to the Service). Except as
                    explicitly provided herein, nothing in this Agreement shall
                    be deemed to create a license in or under any such
                    Intellectual Property Rights, and you agree not to sell,
                    license, rent, modify, distribute, copy, reproduce,
                    transmit, publicly display, publicly perform, publish,
                    adapt, edit or create derivative works from any Breef
                    Content. Use of the Breef Content for any purpose not
                    expressly permitted by these Terms is strictly prohibited.
                </p>

                <p>
                    The Breef Content may not be used to disparage Breef, any
                    Users, any applicable third party or the Service, nor shall
                    they be used in any manner that may damage any goodwill of
                    the Breef Content. Use of any Breef Content as part of a
                    link to or from any site is prohibited unless establishment
                    of such link is approved in advance by Breef in writing.
                </p>

                <p>
                    You are not permitted to use or display any of the marks
                    featured in the Service, whether trademarked or not, without
                    first obtaining the express written consent of the owner of
                    the marks. Breef is the owner of the ‘Breef’ logo, marks and
                    brand.
                </p>

                <p>
                    You may choose to or we may invite you to submit comments or
                    ideas about the Service, including without limitation about
                    how to improve the Service or our products (“Ideas”). By
                    submitting any Idea, you agree that your disclosure is
                    gratuitous, unsolicited and without restriction and will not
                    place Breef under any fiduciary or other obligation, and
                    that we are free to use the Idea without any additional
                    compensation to you, and/or to disclose the Idea on a
                    non-confidential basis or otherwise to anyone. You further
                    acknowledge that, by acceptance of your submission, Breef
                    does not waive any rights to use similar or related ideas
                    previously known to Breef, or developed by its employees, or
                    obtained from sources other than you.
                </p>
                <h3>9. Account Details and Security</h3>

                <p>
                    You agree to provide true, accurate and complete information
                    as prompted by the registration form and all forms you
                    access through the Service, and to update this information
                    to maintain its truthfulness, accuracy and completeness.
                    Breef makes no warranties about any of your information,
                    either to you, Users or third parties. You cannot register
                    for more than one User account without express written
                    permission from Breef.
                </p>

                <p>
                    You must keep your User account username and password secure
                    and not disclose your details to any other person. We
                    encourage and may require you to use “strong” passwords
                    (passwords that use a combination of upper and lower case
                    letters, numbers and symbols) with your account. You must
                    notify Breef immediately of any breach of security or
                    unauthorized use of your account at{' '}
                    <a className="accent" href="mailto:support@breef.com">
                        support@breef.com
                    </a>
                    . You (and where relevant, your employer) are responsible
                    for all activity that occurs in your account. Breef will not
                    be liable for any losses caused by any unauthorized use of
                    your account.
                </p>

                <p>
                    Your User account is for your individual use only. You may
                    never use another User’s account, nor authorize others to
                    use your account, nor assign or otherwise transfer your
                    account to any other person or entity. You are solely
                    responsible for the activity that occurs on your account.
                </p>

                <p>
                    In the event you use your account as a company account, your
                    employer will be responsible for the security of your
                    password. All activities that occur in all accounts shall
                    bind the company that you, as a User, represent. If you do
                    not have this authority, do not use the Service.
                </p>

                <h3>10. Email and Telephone Consent</h3>

                <p>
                    By providing Breef your email address you consent to our
                    using your email address to send you Service-related
                    notices, including any notices required by law, in lieu of
                    communication by postal mail. We may also use your email
                    address to send you other messages, such as changes to
                    features of the Service and special promotions. If you do
                    not want to receive such email messages, you may opt out or
                    change your preferences by contacting us at{' '}
                    <a className="accent" href="mailto:support@breef.com">
                        support@breef.com
                    </a>
                    . Opting out may prevent you from receiving email messages
                    regarding updates, improvements, or special promotions. You
                    cannot opt out of service related communications without
                    deactivating your Breef account, and even then we may
                    contact you for Service-related purposes. You may deactivate
                    your Breef account at any time by emailing{' '}
                    <a className="accent" href="mailto:support@breef.com">
                        support@breef.com
                    </a>
                </p>

                <p>
                    By submitting your telephone information, you consent to
                    being contacted on the telephone by text message or calling
                    at the number(s) that you have provided, irrespective of
                    whether they appear on a ‘Do Not Call’ list.
                </p>

                <h3>11. Privacy</h3>

                <p>
                    We care about the privacy of our Users. Your registration
                    and use of the Service is conditional upon you agreeing and
                    complying with our Privacy Policy. You understand that by
                    using the Services you consent to the collection, use and
                    disclosure of your personally identifiable information and
                    aggregate data as set forth in our Privacy Policy, and to
                    have your personally identifiable information collected,
                    used, transferred to and processed in the United States, as
                    well as outside the United States, as contemplated by our
                    Privacy Policy.
                </p>

                <p>
                    Should you have any questions relating to your privacy as a
                    User of the Service, please review our{' '}
                    <a className="accent" href={`/${role}/privacy-policy`}>
                        Privacy Policy
                    </a>
                    .
                </p>

                <h3>12. Confidential Information</h3>

                <p>
                    In using the Service, you will be granted access to
                    information belonging to Clients or Agency Talent which is
                    confidential. <b>“Confidential Information”</b> shall
                    include information relating to the Client and Agency Talent
                    relationship, as well as information relating to the Breef
                    Service, as identified below.
                </p>

                <h4>12.1 Client and Agency Talent Confidential Information</h4>

                <p>Information shared between the Users relating to:</p>

                <ol type="i">
                    <li>the identity of a Client or Agency Talent;</li>

                    <li>the business or Project of a Client;</li>

                    <li>the business of Agency Talent;</li>

                    <li>work produced for a Client by Agency Talent;</li>

                    <li>nonpublic or proprietary information; or</li>

                    <li>
                        information which, in the ordinary course of business,
                        would be considered as, or is marked “confidential”
                    </li>
                </ol>

                <p>
                    shall be classified as <b>“Confidential Information”</b> and
                    must remain confidential at all times unless otherwise
                    provided for in these Terms or agreed between Users.
                </p>

                <h4>12.2 Breef Confidential Information</h4>

                <p>
                    All information which you receive access to through the
                    Service relating to the Breef Service, our business,
                    personnel, activities, other Users, and any information
                    marked as “confidential” or which in the ordinary course of
                    your relationship with Breef would be considered
                    confidential, shall be classified the{' '}
                    <b>“Confidential Information”</b> of Breef and must remain
                    confidential at all times unless otherwise provided for in
                    these Terms.
                </p>

                <h4>12.3 The Form of Confidential Information</h4>

                <p>
                    The form that Confidential Information shall take includes
                    (but is not limited to): documents, conversations,
                    communications, online content and information created,
                    received, produced or obtained through the Service or
                    Client-Agency Talent relationship, including through any
                    employees, contractors, agents and representatives of either
                    party.
                </p>

                <h4>12.4 How to Treat Confidential Information</h4>

                <p>
                    Information that you receive through the Service classified
                    as Confidential Information shall be treated confidentially
                    by all Users. You agree not to disclose or to attempt to
                    personally benefit from nonpublic or proprietary information
                    of any User. The use of any such Confidential Information
                    shall be restricted in accordance with these Terms until it
                    has become publicly available through no action of your own.
                </p>

                <p>
                    To the extent a User provides Confidential Information to
                    another User, the recipient shall protect the Confidential
                    Information with the same degree of care as it uses to
                    protect its own confidential information, but in no event
                    with less than due care.
                </p>

                <p>
                    Any use of Confidential Information relating to a User or a
                    Project is a matter for Clients and Agency Talent to agree.
                    We recommend the use of non-disclosure agreements to protect
                    Confidential Information while communicating with Users
                    through the Service and negotiating terms.
                </p>

                <p>
                    As a User of the Service, you agree that in relation to
                    Confidential Information, you shall abide by your
                    obligations to:
                </p>

                <ol type="i">
                    <li>Treat information confidentially;</li>

                    <li>
                        Not disclose Confidential Information or use it for your
                        own benefit;
                    </li>

                    <li>
                        Restrict its use to purposes permitted by the discloser
                        until it becomes publicly available;
                    </li>

                    <li>
                        Use commercially reasonable efforts to protect the
                        Confidential Information of other Users and Breef; and
                    </li>

                    <li>
                        Follow the processes within these Terms relating to the
                        disclosure of Confidential Information.
                    </li>
                </ol>

                <p>
                    Breach of these obligations to protect Confidential
                    Information may result in your immediate removal from the
                    Service and may expose you to further action from Breef
                    and/or other Users.
                </p>

                <p>
                    In the event of you becoming aware of a suspected or actual
                    breach of the obligations in these Terms relating to
                    Confidential Information, you agree to immediately notify
                    Breef.
                </p>

                <h4>12.5 Return of Confidential Information</h4>

                <p>
                    In circumstances where you choose to no longer to
                    participate in the service, Breef is not responsible for the
                    return of Confidential Information. Breef recommends that
                    Users include terms in any agreement or during the Proposal
                    process, requiring that Users protect Confidential
                    Information and return it once no longer being used as
                    intended by the disclosing party.
                </p>

                <h4>12.6 Disclosure Compelled by Law</h4>

                <p>
                    In circumstances where you are legally required to disclose
                    Confidential Information, you shall, at first instance,
                    inform the third party who disclosed and/or owns the
                    Confidential Information of the requirement to disclose as
                    soon as reasonably practicable and liaise with that party
                    prior to disclosing any Confidential Information. Failure to
                    do so shall be considered a breach of these Terms.
                </p>

                <h4>12.7 Disclosure of Confidential Information by Breef</h4>

                <p>
                    Breef may be required to disclose Confidential Information
                    to parties in order for the Service to operate as intended.
                    To find out more about how we share information, please
                    review our{' '}
                    <a className="accent" href={`/${role}/privacy-policy`}>
                        Privacy Policy
                    </a>
                    . If you have any questions, please contact us at{' '}
                    <a className="accent" href="mailto:support@breef.com">
                        support@breef.com
                    </a>
                </p>

                <p>
                    Breef takes no responsibility for the sharing and use of
                    your Confidential Information as a part of the Service.
                </p>

                <h3>13. Links to External Websites</h3>

                <p>
                    The Service may contain links to User and third party
                    websites, advertisers, services, special offers, or other
                    events or activities that are not owned or controlled by
                    Breef. Breef does not endorse or assume any responsibility
                    for any User or third party sites, information, materials,
                    products, or services, nor do we have any control over such
                    sites. If you access a User third party website from the
                    Service, you do so at your own risk, and you understand that
                    this Agreement and Breef’s{' '}
                    <a className="accent" href={`/${role}/privacy-policy`}>
                        Privacy Policy
                    </a>{' '}
                    do not apply to your use of such sites. You expressly
                    relieve Breef from any and all liability arising from your
                    use of any User or third party website, service, or content.
                    Additionally, your dealings with or participation in
                    promotions of Users or advertisers found on the Service,
                    including payment and delivery of good and services, and any
                    other terms (such as warranties) are solely between you and
                    such Users or advertisers. You agree that Breef shall not be
                    responsible for any loss or damage of any sort relating to
                    your dealings with such Users or advertisers.
                </p>

                <h3>14. Limitation of Liability</h3>

                <p>USE OF THE SERVICE IS ENTIRELY AT YOUR OWN RISK.</p>

                <p>
                    UNDER NO CIRCUMSTANCES SHALL BREEF BE RESPONSIBLE FOR, AND
                    YOU AGREE THAT WE WILL HAVE NO LIABILITY IN RELATION TO,
                    YOUR USE AND CONDUCT IN CONNECTION WITH THE SERVICE, OR ANY
                    OTHER PERSON’S USE OR CONDUCT IN CONNECTION WITH THE
                    SERVICE.
                </p>

                <p>
                    TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO
                    EVENT SHALL BREEF, ITS AFFILIATES, AGENTS, DIRECTORS,
                    EMPLOYEES, SUPPLIERS OR LICENSORS BE LIABLE FOR ANY DIRECT,
                    INDIRECT, PUNITIVE, INCIDENTAL, SPECIAL, CONSEQUENTIAL OR
                    EXEMPLARY DAMAGES, INCLUDING WITHOUT LIMITATION DAMAGES FOR
                    LOSS OF PROFITS, GOODWILL, USE, DATA, CONTRACTS, OR OTHER
                    INTANGIBLE LOSSES, THAT RESULT FROM THE USE OF, OR INABILITY
                    TO USE, THIS SERVICE, WHETHER IN TORT, CONTRACT OR
                    OTHERWISE. UNDER NO CIRCUMSTANCES WILL BREEF BE RESPONSIBLE
                    FOR ANY DAMAGE, LOSS OR INJURY RESULTING FROM HACKING,
                    TAMPERING OR OTHER UNAUTHORIZED ACCESS OR USE OF THE SERVICE
                    OR YOUR ACCOUNT OR THE INFORMATION CONTAINED THEREIN.
                </p>

                <p>
                    FURTHER, WE SHALL NOT BE LIABLE IN ANY WAY FOR THE PROJECTS
                    OF CLIENTS OR THE SERVICES PROVIDED BY AGENCY TALENT, OR ANY
                    THIRD PARTY GOODS AND SERVICES OFFERED THROUGH THE SERVICE
                    OR IN CONNECTION WITH CONDUCTING COMMERCIAL TRANSACTIONS
                    THROUGH THE SERVICE. BREEF SHALL NOT BE LIABLE AS TO THE
                    QUALITY OR CAPACITY OF CLIENTS OR AGENCY TALENT, ANY
                    RELIANCE PLACED BY YOU ON THE COMPLETENESS OR ACCURACY OF
                    ANY REPRESENTATIONS MADE BY A USER OF THE SERVICE, OR AS A
                    RESULT OF ANY RELATIONSHIP OR TRANSACTION BETWEEN YOU AND
                    ANY USER OF THE SERVICE, INCLUDING BUT NOT LIMITED TO A USER
                    PROVIDING A PROPOSAL THROUGH THE SERVICE.
                </p>

                <p>
                    ANY DECISIONS YOU MAKE AS A USER OF THE SERVICE OR IN
                    CONNECTION WITH THE SERVICE, WHETHER DIRECTLY OR INDIRECTLY,
                    ARE SOLELY YOUR RESPONSIBILITY. BREEF WILL NOT ASSESS THE
                    SUITABILITY, LEGALITY OR ABILITY OF ANY USER, WHETHER CLIENT
                    OR AGENCY TALENT OR ANY OTHER THIRD PARTY, AND YOU EXPRESSLY
                    WAIVE AND RELEASE BREEF FROM ANY AND ALL LIABILITY IN
                    RELATION TO YOUR USE OF THE SERVICE AND ANY INTRODUCTIONS
                    MADE BY BREEF. THE PERFORMANCE OF AGREEMENTS INITIATED AS A
                    RESULT OF INTRODUCTIONS MADE THROUGH THE SERVICE ARE SOLELY
                    THE RESPONSIBILITY OF THE PARTIES THERETO, AND BY
                    REGISTERING FOR THE SERVICE, YOU UNDERSTAND THAT BREEF HAS
                    NO LIABILITY WHATSOEVER IN RELATION TO THE PERFORMANCE OR
                    FAILURE TO PERFORM UNDER ANY SUCH AGREEMENT.
                </p>

                <p>
                    TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, BREEF
                    ASSUMES NO LIABILITY OR RESPONSIBILITY FOR ANY (I) ERRORS,
                    MISTAKES, OR INACCURACIES OF ANY CONTENT; (II) PERSONAL
                    INJURY OR PROPERTY DAMAGE, OF ANY NATURE WHATSOEVER,
                    RESULTING FROM YOUR ACCESS TO OR USE OF OUR SERVICE; (III)
                    ANY UNAUTHORIZED ACCESS TO OR USE OF OUR SECURE SERVERS
                    AND/OR ANY AND ALL PERSONAL INFORMATION STORED THEREIN; (IV)
                    ANY INTERRUPTION OR CESSATION OF TRANSMISSION TO OR FROM THE
                    SERVICE; (V) ANY BUGS, VIRUSES, TROJAN HORSES, OR THE LIKE
                    THAT MAY BE TRANSMITTED TO OR THROUGH OUR SERVICE BY ANY
                    THIRD PARTY; (VI) ANY ERRORS OR OMISSIONS IN ANY CONTENT OR
                    FOR ANY LOSS OR DAMAGE INCURRED AS A RESULT OF THE USE OF
                    ANY CONTENT POSTED, EMAILED, TRANSMITTED, OR OTHERWISE MADE
                    AVAILABLE THROUGH THE SERVICE; AND/OR (VII) USER CONTENT OR
                    THE DEFAMATORY, OFFENSIVE, OR ILLEGAL CONDUCT OF ANY THIRD
                    PARTY.
                </p>

                <p>
                    IN NO EVENT SHALL BREEF, ITS AFFILIATES, AGENTS, DIRECTORS,
                    EMPLOYEES, SUPPLIERS, OR LICENSORS BE LIABLE TO YOU FOR ANY
                    CLAIMS, PROCEEDINGS, LIABILITIES, OBLIGATIONS, DAMAGES,
                    LOSSES OR COSTS IN AN AMOUNT EXCEEDING THE AMOUNT YOU MAY
                    HAVE PAID TO BREEF HEREUNDER OR $100.00, WHICHEVER IS
                    GREATER. THIS LIMITATION OF LIABILITY CLAUSE APPLIES WHETHER
                    THE ALLEGED LIABILITY IS BASED ON CONTRACT, TORT,
                    NEGLIGENCE, STRICT LIABILITY, OR ANY OTHER BASIS, EVEN IF
                    BREEF HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
                    THE FOREGOING LIMITATION OF LIABILITY SHALL APPLY TO THE
                    FULLEST EXTENT PERMITTED BY LAW IN THE APPLICABLE
                    JURISDICTION.
                </p>

                <p>
                    TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE EXCLUDE ALL
                    IMPLIED REPRESENTATIONS WHICH, BUT FOR THESE TERMS, MIGHT
                    APPLY IN RELATION TO YOUR USE OF THE SERVICE.
                </p>

                <h3>15. Indemnification</h3>

                <p>
                    You agree to indemnify and hold harmless Breef, its related
                    entities and its affiliates, officers, employees,
                    representatives and agents (each an{' '}
                    <b>“Indemnified Party”</b>) from any and all claims,
                    actions, damages, liabilities, costs and expenses
                    (including, but not limited to, reasonable attorneys’ fees
                    and all related costs and expenses) arising from or relating
                    to:
                </p>

                <ol type="i">
                    <li>Your use of the Service;</li>

                    <li>Your User Content;</li>

                    <li>Any breach by you of these Terms; and</li>

                    <li>
                        Any work, services or any other matter for which you are
                        responsible under a relevant service agreement relating
                        to a Project or Proposal.
                    </li>
                </ol>

                <p>
                    If you are involved in a Project, you also agree to
                    indemnify and hold harmless the Indemnified Parties in
                    relation to all claims, liabilities, losses, settlements,
                    costs, taxes, levies, charges and expenses (including, but
                    not limited to, reasonable attorneys’ fees and all related
                    costs and expenses) arising from or relating to payments
                    made (or owed) between Clients and Agency Talent. For the
                    avoidance of doubt, such obligations are a matter for those
                    Users, and not Breef.
                </p>

                <h3>16. Dispute Resolution</h3>

                <h4>16.1 Contacting Breef</h4>

                <p>
                    For any dispute with Breef, you agree to first contact us at{' '}
                    <a className="accent" href="mailto:support@breef.com">
                        support@breef.com
                    </a>{' '}
                    and attempt to resolve the dispute with us informally.
                </p>

                <h4>16.2 Binding Arbitration</h4>

                <p>
                    In the unlikely event that Breef has not been able to
                    resolve a dispute it has with you after attempting to do so
                    informally, we each agree to resolve any claim, dispute, or
                    controversy (excluding any Breef claims for injunctive or
                    other equitable relief) arising out of or in connection with
                    or relating to these Terms, or the breach or alleged breach
                    thereof (collectively, “Claims”), by binding arbitration by
                    the American Arbitration Association (“AAA”) under the
                    Commercial Arbitration Rules and Supplementary Procedures
                    for Consumer Related Disputes then in effect for the AAA,
                    except as provided herein. Those rules can be found at{' '}
                    <a className="accent" href="https://www.adr.org">
                        www.adr.org
                    </a>
                </p>

                <p>
                    Nothing in this clause shall prevent either party from
                    seeking injunctive or other equitable relief from the courts
                    as necessary to prevent the actual or threatened
                    infringement, misappropriation, or violation of that party’s
                    data security, Intellectual Property Rights, or other
                    proprietary rights.
                </p>

                <h4>16.3 Location and Fees</h4>

                <p>
                    The arbitration will be conducted in New York County, New
                    York, unless you and Breef agree otherwise. Each party will
                    be responsible for paying any AAA filing, administrative and
                    arbitrator fees in accordance with AAA rules. The award
                    rendered by the arbitrator shall include costs of
                    arbitration, reasonable attorneys’ fees and reasonable costs
                    for expert and other witnesses, and any judgment on the
                    award rendered by the arbitrator may be entered in any court
                    of competent jurisdiction.
                </p>

                <h4>
                    16.4 Individual Basis: Class Action and Jury Trial Waivers
                </h4>

                <p>
                    YOU AGREE THAT ALL CLAIMS MUST BE BROUGHT IN THE PARTIES’
                    INDIVIDUAL CAPACITY, AND NOT AS A PLAINTIFF OR CLASS MEMBER
                    IN ANY PURPORTED CLASS OR REPRESENTATIVE PROCEEDING, AND,
                    UNLESS WE AGREE OTHERWISE, THE ARBITRATOR MAY NOT
                    CONSOLIDATE MORE THAN ONE PERSON’S CLAIMS. YOU AGREE THAT,
                    BY ENTERING INTO THIS AGREEMENT, YOU AND BREEF ARE EACH
                    WAIVING THE RIGHT TO A TRIAL BY JURY OR TO PARTICIPATE IN A
                    CLASS ACTION.
                </p>

                <h4>16.5 Enforcement</h4>

                <p>
                    Any judgment on the award made by the arbitrator may be
                    entered in any court of competent jurisdiction. The United
                    Nations Conventions on Contracts for the International Sale
                    of Goods shall have no applicability.
                </p>

                <h4>16.6 Invalidity</h4>

                <p>
                    In the event that a court of competent jurisdiction finds
                    the above arbitration provisions invalid or inapplicable,
                    you and Breef each agree to the exclusive jurisdiction of
                    the Federal and State Courts located in New York, New York.
                    You and Breef each agree to submit to the exercise of
                    personal jurisdiction of such courts for the purpose of
                    litigating any applicable dispute or claim.
                </p>

                <h4>16.7 Opting Out and Survival</h4>

                <p>
                    If you do not wish to arbitrate disputes with the Breef and
                    you are an individual, you may opt out of your agreement to
                    arbitrate by emailing{' '}
                    <a className="accent" href="mailto:support@breef.com">
                        support@breef.com
                    </a>{' '}
                    within thirty (30) days of the first of the date you access
                    or use the Service. This dispute resolution clause shall
                    survive termination of the Terms and/or suspension or
                    deactivation of your Breef account.
                </p>

                <h3>17. General</h3>

                <h4>17.1 Assignment</h4>

                <p>
                    Breef may assign these Terms, any rights or obligations, and
                    licenses granted hereunder without restriction. You may not
                    transfer or assign these Terms, rights and licenses granted
                    hereunder without the express written consent of Breef. Any
                    attempted transfer or assignment in violation hereof shall
                    be null and void. Subject to the foregoing restrictions,
                    these Terms will inure to the benefit of the successors and
                    permitted assigns of the parties.
                </p>

                <h4>17.2 Entire Agreement</h4>

                <p>
                    These Terms and any schedules or Policies incorporated
                    herein constitute the entire agreement between you and us in
                    relation to their subject matter and cancel and supersede
                    any prior contemporaneous discussions and content of
                    communication between us. You acknowledge that you have not
                    relied on any representations by us entering this agreement,
                    except those contained in these Terms.
                </p>

                <h4>17.3 Continued Application</h4>

                <p>
                    Even if you are no longer using the Service or deactivate
                    your account or if we terminate your account, these Terms
                    will continue to apply as intended.
                </p>

                <h4>17.4 Additional Agreements</h4>

                <p>
                    Client and Agency Talent Users may enter into additional,
                    supplemental or other agreement they deem appropriate (for
                    example, confidentiality agreements, contractor or work for
                    hire agreements, assignment of rights, etc.) but under no
                    circumstances will Breef be a party to those agreements,
                    except executed in writing by an authorized representative
                    of Breef. Furthermore, these Terms will govern and supersede
                    any term or condition in an additional agreement between
                    Users that seeks to expand or restrict Breef’s rights under
                    this Agreement. Additionally, you are required to report to
                    Breef any attempt by a User to contract outside these Terms.
                </p>

                <h4>17.5 Governing Law</h4>

                <p>
                    The Service is based in the State of New York, USA. These
                    Terms shall be governed by the laws of the State of New York
                    and any controversy, dispute or claim arising out of
                    relating to these Terms will be governed by those laws of
                    that state, without regard to its conflict of law
                    provisions, and noting the dispute resolution procedure in
                    clause 16 of these terms.
                </p>

                <h4>17.6 Notices and consent to electronic notice</h4>

                <p>
                    You hereby provide us with consent to use electronic means
                    to deliver any notices pursuant to these Terms. Breef may
                    provide notice by email (using the email address that you
                    provide when registering your account); and/or by posting on
                    the Breef website. You may provide notice to us only in
                    writing, either delivered personally or sent by certified
                    mail to:
                </p>

                <p>
                    © 2021 Breef Inc.
                    <br />
                    205 Hudson St
                    <br />
                    Floor 7<br />
                    New York NY
                    <br />
                    10013 USA
                    <br />
                </p>

                <h4>17.7 No waiver</h4>

                <p>
                    The failure or delay of either party to exercise or enforce
                    any right or claim does not constitute a waiver of such
                    right or claim and will in no way affect that party’s right
                    to later enforce or exercise it, unless such party issues an
                    express written waiver, signed by a duly authorized
                    representative of each party.
                </p>

                <h4>17.8 Using automated tools on the Service</h4>

                <p>
                    The use of any content scraping, crawling or spidering tools
                    on the Service and any associated websites is prohibited,
                    with the exception of by search engines for indexing
                    purposes. Unauthorized links to Breef and the Service is
                    strictly forbidden.
                </p>

                <h4>17.9 Variation</h4>

                <p>
                    Any modification or amendment to these Terms shall not be
                    binding unless approved and signed in writing by an
                    authorized representative of Breef.
                </p>

                <p>
                    Any legislation (present or future) which operates to vary
                    an obligation or right, power or remedy of a person in
                    connection with these Terms shall be excluded to the extent
                    permitted by law.
                </p>

                <h4>17.10 Severability</h4>

                <p>
                    If any provision of these Terms is deemed invalid by a court
                    of competent jurisdiction, the invalidity of such provision
                    shall not affect the validity of the remaining provisions of
                    the Terms, which shall remain in full force to give maximum
                    effect to the intent of the parties. The illegality,
                    invalidity or unenforceability of a provision of the Terms
                    in a particular jurisdiction shall not in any way affect the
                    legality, validity or enforceability of such provision in
                    any other jurisdiction or of any other provision in any
                    jurisdiction.
                </p>

                <h4>17.11 Cumulative Rights</h4>

                <p>
                    The rights, powers and remedies provided to us in these
                    Terms are cumulative and not exclusive of the rights, power
                    or remedies provided by law independently of these Terms.
                </p>

                <h3>18. Contact</h3>

                <p>
                    Please contact us at{' '}
                    <a className="accent" href="mailto:support@breef.com">
                        support@breef.com
                    </a>{' '}
                    with any questions regarding these Terms.
                </p>

                <p>
                    PLEASE PRINT AND RETAIN A COPY OF THESE TERMS FOR YOUR
                    RECORDS.
                </p>
            </div>
            <div style={{ fontSize: '16px', color: 'grey' }}>
                Last Updated: March 1, 2020
            </div>
        </StyledTermsOfUseBreef>
    );
};

export default TermsOfUseBreef;
