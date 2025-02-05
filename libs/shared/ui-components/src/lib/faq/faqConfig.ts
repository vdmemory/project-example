import { AppRoleType } from '@breef/shared/types';

type FaqNavigationListType = { id: string; title: string }[];
export type FaqAnswersListType = { title: string; description: string }[];

export const navigationList: FaqNavigationListType = [
    {
        id: 'about',
        title: 'about',
    },
    {
        id: 'pricing',
        title: 'pricing',
    },
    {
        id: 'clients',
        title: 'clients',
    },
    {
        id: 'agencies',
        title: 'agencies',
    },
    {
        id: 'policies',
        title: 'policies',
    },
];

export const aboutAnswer: FaqAnswersListType = [
    {
        title: 'What is Breef?',
        description: `<p>Breef is the modern, end-to-end outsourcing platform. We bring together the world’s best small agencies and workforce technology - in one place.</p>
        <p>Through a human-tech approach, we make outsourcing projects easy. Through the Breef Platform and the support of industry experts (Client Leads), you can seamlessly manage project scope, agency pitches, contracts and payments.</p>
        <p>For brands, Breef allows access to vetted agencies, tailored for your project.</p>
        <p>For small agencies, being on Breef means access to high-value project opportunities from leading brands.</p>`,
    },
    {
        title: 'How Do Brands Use Breef?',
        description: `<p>Brands use Breef to easily find the best agencies to outsource their digital and creative projects.</p>
        <p>Breef is free to join.</p>
        <p>After creating your Breef account, you can plan + scope your project – with help from a Client Lead (industry experts in digital & creative projects) if needed.</p>
        <p>Once you’re ready to post your project, there’s a $299 USD posting fee. This gives access to tailored pitches from hand-picked agencies within four days (compared to several weeks when / of  finding an agency yourself).</p>
        <p>When you receive your agency pitches, compare and shortlist the agencies you’d like to speak with further. Following introductory calls and agreement of the final SOW (Scope of Work), select your Agency Partner.</p>
        <p>Once your project has commenced, you also manage all contracts and payments through Breef, making it easy to manage your work together.</p>`,
    },
    {
        title: 'How Do Agencies Use Breef?',
        description: `<p>As an agency on Breef, you can receive access to hand-picked project opportunities from leading brands. As a closed marketplace, we offer a truly tailored approach to outsourcing. We only invite a handful of teams to submit a pitch for each project.</p>
        <p>Through our platform, our application process considers everything the client would want to know about you and your work. All applications are reviewed by the Breef team. All project contracts and payments are also seamlessly managed through Breef.</p>
        <p>There are over 5,000 vetted agencies on Breef. You can learn more and <a class="accent" href="https://www.breef.com/join-team"> apply to Breef here.</a> We’d love to work with you!</p>`,
    },
    {
        title: 'What Does Breef Do?',
        description: `<p>Breef is an outsourcing platform that connects brands with leading small agencies, globally. Our process ensures all aspects of a project - from start to finish - are considered. This includes everything from project planning, scope creation, pitches, payments and more.</p><p>Most people don’t know where to start when it comes to finding and working with an agency. Breef is the solution.</p>`,
    },
    {
        title: 'How Is Breef Different?',
        description: `<p>Breef is a modern outsourcing solution that solves for the specific needs of brands and their projects.</p><p>We are not your typical ‘freelance’ marketplace, serving you thousands of options for you to sort through and vet. We dig deeper to find truly talented agencies who can provide you with tailored pitches that meet your project needs and specific goals. Only the best agencies are extended an invitation to bid on your project.</p><p>Breef represents the highest standards of collaboration and innovation. We are a new way of working in the post-pandemic era.</p><p>Clients turn to Breef for projects that they can’t do ‘in house.’ These are projects that move the needle within their organization (a new website, paid advertising, etc). We’re not focused on a one-off logo design. Because of this, we’ve created a human-tech solution that ensures unparalleled results, from innovative agencies, globally.</p>`,
    },
    {
        title: `What Types of Clients & Brands Use Breef?`,
        description: `<p>Breef works with clients who are seeking to collaborate with leading small agencies for their various project needs. Our clients are looking to work with the best - no matter their location. Clients see value in the Breef Process because it’s more efficient and affordable than a full-time hire or a traditional ‘big’ agency. Our clients are global innovators, from large corporations to startups, in a range of industries, globally.</p>
        <p>Our process provides clients with the ability to set budget ranges and negotiate service offerings with Agency Talent, giving clients a range of flexible options for outsourced projects.</p>`,
    },
    {
        title: 'What Types of Projects Can I Do With Breef?',
        description: `<p>As a general rule of thumb, turn to Breef for anything that can't be done ‘in house.’</p>
        <p>For many clients, this means digital + creative projects. This work often requires specialists for one-off needs, strategies, or campaigns. And yes, from experience, budgets that need to be stretched further are often allocated here, meaning full-time hires or big agencies aren’t an option.</p>
        <p>We’ve created the largest global network of Boutique Agencies because we believe they’re best equipped for work like content creation, paid media, and branding. We’ve vetted and onboarded over 5,000 small agencies around the world for this exact reason.</p>
        <p><a class="accent" href="https://www.breef.com/blog/what-types-of-projects-should-i-do-with-breef"> Here is a full list of our service offerings.</a></p>`,
    },
    {
        title: 'How Do I Get Started on Breef?',
        description: `<p>For Clients, joining Breef is free. You can <a class="accent" href="https://projects.breef.com/registration?type=client">get started here.</a></p>
        <p>
        To join as 'Agency Talent,' you can <a class="accent" href="https://projects.breef.com/registration?type=agency">get started here.</a> All agencies accepted into the Breef Community exemplify the highest of standards in work, clientele, and criteria. Applications from freelancers, large agencies, and contractors will also be reviewed and held to the same qualification standards.</p>`,
    },
    {
        title: 'What Are the Fees Involved?',
        description: `<p>There are two types of fees payable to Breef on a Project:</p>
        <p><span class="bold">Clients: </span>$299 Project Posting Fee</p>
        <p>This fee is to post your project + receive tailored pitches  from hand-selected agencies. This fee helps to cover the cost of project management, scope assistance, and agency curation provided for each client. This fee is refundable within 15 days of posting if you are not satisfied with your agency selection and respective pitches.</p>
        <p>The client is also responsible for the agreed project cost if an Agency Partner is selected.</p>
        <p><span class="bold">Agency: </span>15% Agency Talent Fee on the final project price.</p>
        <p>This means the Agency Talent receives 85% of the final Project price, and 15% is payable to Breef and helps us to continue to bring you the best projects from world-leading brands.</p>`,
    },
];

export const pricingAnswer: FaqAnswersListType = [
    {
        title: 'How Much Does Breef Cost?',
        description: `<p>For clients, joining Breef is free. You can <a class="accent" href="https://projects.breef.com/registration?type=client">get started here.</a></p>
        <p>Upon signup, you can plan + scope projects and work with a Breef Client Lead – a project expert who can help you plan, budget, and outline your various project deliverables – at no cost.</p>
        <p>To receive tailored pitches from handpicked and vetted agencies, there is a $299 Project Posting Fee. This fee helps to cover the cost of project planning + scope and agency curation that Breef provides for each client. This fee is refundable within 15 days of posting if you are not satisfied with your Breef Pitches .</p>
        <p>The client is also responsible for the agreed project cost if an Agency Partner is selected.</p>`,
    },
    {
        title: 'Is Breef Free to Join?',
        description: `<p>Yes, Breef is free to join for both clients and agencies.</p>
        <p>For clients, you can <a class="accent" href="https://projects.breef.com/registration?type=client">get started here.</a></p>
        <p>For agencies, you can <a class="accent" href="https://projects.breef.com/registration?type=agency">get started here.</a></p>`,
    },
    {
        title: 'What Is a Project Posting Fee?',
        description: `<p>Our $299 USD Project Posting Fee allows you to unlock pitches from vetted agencies, handpicked for you, in under 5 days.</p>
        <p>This fee is refundable within 15 days of posting if you are not satisfied with your agency pitches on Breef.</p>
        <p>We believe our process saves not only money but also time. On average, it takes a client 2 months to find and get started with an Agency Partner on their own. On Breef, it takes less than a week.</p>
        <p>This fee also helps to cover the cost of project planning, scope and agency curation that Breef provides for each client.</p>`,
    },
    {
        title: 'How Do Clients Pay for a Project?',
        description: `<p>Breef is your central point of agency spend. All project payments are made through Breef. Once your project is ready to commence, Breef will provide you with the necessary tools to process payments. Clients can nominate when to release a payment held by Breef to the Agency.</p>`,
    },
    {
        title: 'What Is the Agency Talent Fee?',
        description: `<p>The Agency Talent Fee is 15% on the final project price. This means Agency Talent receives 85% of the final Project price. This fee is applicable for the first year of a client + agency engagement.</p>
        <p>Upon submitting a pitch, you will receive a clear breakdown of fee vs. payment. This fee is paid upfront during the first project payment.</p>`,
    },
];

export const clientsAnswer = (role: AppRoleType): FaqAnswersListType => [
    {
        title: 'What Types of Projects Can I Do with Breef?',
        description: `<p>Breef specializes in digital + creative projects. From retainer-based work to one-off needs, our agencies can help with a wide range of projects.</p>
        <p>Our agencies are grouped into the following categories:</p>
        <ol>
            <li style="font-weight: bold; font-size: 16px;">
                <p>
                    <span class="bold">Digital + Marketing: </span>  (e.g., digital strategy, paid media, influencer marketing, organic + paid social media paid search + SEO, Amazon marketing…)
                </p>
            </li>
            <li style="font-weight: bold; font-size: 16px;">
                <p>
                    <span class="bold">Creative + Development: </span>(e.g., art direction, branding + strategy, styling, content creation + production, illustration…)
                </p>
            </li>
            <li style="font-weight: bold; font-size: 16px;">
                <p>
                    <span class="bold">Web + Development: </span>(e.g., mobile design / dev (apps), Amazon strategy, cybersecurity, data analytics, UI/UX design…)
                </p>
            </li>
        </ol>
        <p>Once you post a project, our team  will ensure that you receive pitches  from agencies that best meet your project needs.</p>`,
    },
    {
        title: 'How Do I Start a Project?',
        description: `<p>Once you get started on Breef - free - you will receive access to Breef’s Project Platform, where you can start a project, manage existing projects, connect with your Client Lead, and review pitches from vetted agencies of Breef.</p>
        <p>All projects begin with a scope. Our project tools allow you to outline your project goals, needs, and budget to help agencies best submit a pitch for your project.</p>
        <p>Your Breef Client Lead is also here to assist in every step of the process.</p>`,
    },
    {
        title: 'How Much Does Breef Cost?',
        description: `<p>For clients, joining Breef is free. You can <a class="accent" href="https://projects.breef.com/registration?type=client">get started here.</a></p>
        <p>Upon signup, you can plan + scope projects, and work with a Breef Client Lead - a project expert who can help you budget and outline your various project deliverables - at no charge.</p>
        <p>To receive tailored pitches from handpicked and vetted agencies, there is a $299 Project Posting Fee. This fee helps to cover the cost of project planning + scoping and pitch curation that the Breef Team and technology provide for each client. This fee is refundable within 15 days of posting if you are not satisfied with your agency options.</p>
        <p>The client is also responsible for the agreed project cost if an Agency Partner is selected.</p>`,
    },
    {
        title: 'How Long Does It Take to Receive Agency Pitches?',
        description: `<p>Once your project is posted, it is shared with agencies that meet your requirements and who are hand-picked for your project. You can expect to receive pitches (in your budget range + timeline) within one week.</p>
        <p>Should you need to get started sooner, please contact us at <a class="accent" href="mailto:projects@breef.com">projects@breef.com,</a> and we will work with you to expedite the timeline.</p>`,
    },
    {
        title: 'Is Breef Available Globally?',
        description: `<p>Yes, we have clients and agencies in over 20 countries.</p>
        <p>
            You can post projects from anywhere in the world (subject to local law). The Breef Platform is governed by the laws of the United States of America. If you are paying outside of the United States, let your Client Lead know to coordinate payment.
        </p>
        <p>
            Clients and teams are allowed to contract in whatever jurisdiction they choose; however, please remember that Breef has specific policies around circumventing our service, and you must obey all Breef policies at all times, as well as include our Project Exhibit (including standard terms) in your agreement.
        </p>`,
    },
    {
        title: 'Where Will My Agency Be Located?',
        description: `<p>
            The Breef Community is made of Boutique Agencies from around the world. If location is important, clients may specify a particular location for their team when outlining a project on the platform.
        </p>`,
    },
    {
        title: 'How Do Agencies Pitch For Projects?',
        description: `<p>
            Agencies create and submit their detailed pitch using the Breef Platform. Breef’s proprietary process assures all details needed to find an Agency Partner are included (agency information, pitch, etc).
        </p>
        <p>
            When all pitches for a project are submitted, clients are notified in their Project Dashboard and by their Client Lead. Pitches can easily be accessed and downloaded to share with your internal team.
        </p>`,
    },
    {
        title: 'How Will I Know When My Pitches Are Ready?',
        description: `<p>
            When all pitches  for a project are submitted, clients are notified in their Project Dashboard, by email, and by their Client Lead. Pitches can easily be accessed and downloaded to share and review with your internal team.
        </p>`,
    },
    {
        title: 'What Happens After I Receive Agency Pitches?',
        description: `<p>
            Take the time to review, compare, and contrast each agency and their offering. Many clients review their pitches  internally with their team and key stakeholders.
        </p>
        <p>
            You can also schedule a call to review the pitches together with your Client Lead.
        </p>
        <p>
            Once you have reviewed each pitch in detail, we suggest selecting 2-3 teams you’d like to shortlist and speak to for an introductory call. This call is a chance to get to know the team and discuss the details of the project + budget.
        </p>
        <p>
            From there, you will finalize the SOW and select the Agency Partner to begin work with.
        </p>`,
    },
    {
        title: 'How Do I Select an Agency?',
        description: `<p>
            While we encourage clients to share feedback with their Client Lead following the shortlisting calls, it is ultimately up to you to determine which agency you would like to work with, based on your project and company needs.
        </p>
        <p>
            You can also refer to this
            <a class="accent" href="https://www.breef.com/blog/how-to-select-an-agency">
                    guide on how to select an agency.
                </a>
        </p>`,
    },
    {
        title: 'What Happens After I Select an Agency?',
        description: `<p>
            Once you have selected an Agency to work with, you are required to let Breef know who you have selected and also provide us with a signed copy of key terms and any relevant contracts agreed between the parties. Once this is complete, you are also required to complete a Project Exhibit (which includes standard terms).
        </p>
        <p>
            Your Client Lead will be available throughout the duration of your project to continue to assist with the relationship and also provide payment assistance.
        </p>
        <p>
            Breef does not manage projects once parties have contracted, so it is important that clients and agencies establish a healthy working environment and procedures around communication. This helps to ensure the project runs smoothly and is on time and on budget.
        </p>`,
    },
    {
        title: 'How Do Project Payments Work?',
        description: `<p>
            All payments for projects / introductions made through Breef must occur through Breef. What defines an ‘Introduction’ can be found in our Terms of Use
            <a class="accent" href="/${role}/terms-of-use" target="_blank">
                here.
            </a>
        </p>
        <p>
            Once your project is ready to commence, we will provide you with Payment documents and invoice you according to the agreed-upon payment schedule. Breef then pays your Agency Partner once the funds have arrived.
        </p>
        <p>
            If you have any questions about our payment process, please email
            <a class="accent" href="mailto:payments@breef.com">
                    payments@breef.com.
                </a>
        </p>`,
    },
    {
        title: 'How Do Ongoing Project Payments Work?',
        description: `<p>
            After an initial deposit payment is made, we recommend funding each stage or phase of a project through milestones. While payments are ultimately up to you as the client and your agency partner to structure, remember that all payments are facilitated through Breef, including fees payable to Breef.
        </p>`,
    },
    {
        title: 'Are Project Timelines Flexible?',
        description: `<p>
            Project timelines are managed between you as the client and your agency partner. We recommend keeping an open line of communication to ensure that all Projects are completed on time.
        </p>`,
    },
    {
        title: 'Is There a Minimum Project Budget?',
        description: `<p>
            Turn to Breef for your most important projects - those that really move the needle within your organization. Breef’s minimum project budget is US $2,500. For specialized Projects with unique budget requirements, please reach out to
            <a class="accent" href="mailto:projects@breef.com">
                    projects@breef.com.
                </a>
        </p>
        <p>
            When you are scoping your project, you set the budget range you’d like to stay in.
        </p>
        <p>
            Project estimates will vary based on a number of factors including delivery date and location of your Boutique Agency. It is the client's responsibility to finalize the budget with their Agency Partner prior to signing an agreement and making the first payment.
        </p>
        <p>
            Please note, Breef does not negotiate budgets - we encourage clients and their Agency Partners to negotiate on a suitable outcome for all parties.
        </p>`,
    },
    {
        title: 'Will My Agency Have Insurance?',
        description: `<p>
            As a part of Breef’s application process, Boutique Agencies are required to prove a history of client success before being accepted as a part of the service. Agencies on Breef have a track record of managing projects professionally and delivering exceptional results for clients.
        </p>
        <p>
            We also understand that sometimes Projects do not go as planned. Breef encourages all parties to maintain various insurances, including general liability and professional liability insurance. As Breef is not a party to a Project contract, all liability issues are matters between clients and agencies.
        </p>
        <p>
            Breef is not responsible for work completion, nor any matters relating to a project. We encourage parties to maintain a constant dialogue and ensure that project scope and requirements are clear. Should you have questions during the project process, please contact your Client Lead.
        </p>`,
    },
    {
        title: 'Can I Use Breef  as Both a Client and a Team?',
        description: `<p>
            Yes. In order to do so, create each account using a different email address.
        </p>`,
    },
    {
        title: 'What If My Project Is Extended Outside of Scope?',
        description: `<p>
            If your Scope of Work or Project is extended, or you choose to engage your Agency Partner for additional work within 12 months of the commencement of your initial Project, please let your Client Lead know.
        </p>
        <p>
            Scope can be easily expanded on the Breef platform.
        </p>
        <p>
            A reminder, all payments are to be facilitated through Breef for the first year of a client / agency engagement.
        </p>`,
    },
    {
        title: 'Can Our Company Work Long Term With an Agency?',
        description: `<p>
            Yes, in fact many of our clients do!
        </p>
        <p>
            Please provide your Client Lead with details of your long-term arrangement. All work initiated within the first year of your relationship will be subject to Breef's relevant policies and procedures.
        </p>
        <p>
            Should you wish to hire your Agency Partner or contractor in a full-time role within your company, please be aware of our policy relating to hires, which requires that hiring clients pay Breef 20% of an individual's first-year salary, inclusive of bonuses and incentives. Please also be aware that your Agency Partner may have clauses in their contracts prohibiting hiring.
        </p>`,
    },
    {
        title: 'Can I Work With Multiple Agencies?',
        description: `<p>
            Yes. We encourage use of the Breef Platform to assemble the best team/s for your various needs. For longer-term arrangements, we can help you structure payments between your business and Agency.
        </p>`,
    },
];

export const agenciesAnswer: FaqAnswersListType = [
    {
        title: 'How Do I Join Breef As an Agency?',
        description: `<p>
            Being a part of Breef means joining the largest collection of boutique agencies, globally.
        </p>
        <p>
            We are always looking to onboard new agencies, contractors, and consultants. You can
            share more about your team and services
            <a class="accent" href="https://www.breef.com/join-team">
                    here.
                </a>
        </p>
        <p>
            We review every application internally to uphold the standards and exceptional work that
            is produced by our Agency Partners.
        </p>`,
    },
    {
        title: 'What Does It Cost for My Agency to Join Breef?',
        description: `<p>
            Being a part of the Breef Community comes at no charge to you. It is free to join
            Breef as an Agency.
        </p>
        <p>
            If you are selected by a client to move forward with a project, we take a 15% referral fee
            off the full price of that project for the first 12 months. This fee is considered and
            calculated when an Agency submits a pitch on the platform.
        </p>`,
    },
    {
        title: 'What Types of Projects Are Shared With Agencies on Breef?',
        description: `<p>
            Breef specializes in helping clients with their digital + creative needs. From retainer-based work to one-off needs, our agencies are specialists in a wide range of services. They include:
        </p>
        <ol>
            <li style="font-weight: bold; font-size: 16px;">
                <p>
                    <span class="bold"> Digital + Marketing: </span> (e.g., digital strategy, paid media, influencer marketing, organic + paid social media , paid search + SEO, Amazon marketing...)
                </p>
            </li>
            <li style="font-weight: bold; font-size: 16px;">
                <p>
                    <span class="bold"> Creative + Development: </span>(e.g., art direction, branding + strategy, styling, content creation + production, illustration…)
                </p>
            </li>
            <li style="font-weight: bold; font-size: 16px;">
                <p>
                    <span class="bold">Web + Development: </span> (e.g., mobile design / dev (apps), Amazon strategy, Cybersecurity, data analytics, UI/UX design…)
                </p>
            </li>
        </ol>
        <p>
            Once a client posts a project, our Agency Leads will share the project with you if they think it’s a fit for your Agency and skill set.
        </p>`,
    },
    {
        title: 'How Do Project Budgets Work?',
        description: `<p>
            When a client on Breef posts a project, they provide a budget range for each deliverable. We encourage you to provide a reasonable estimate within this range. If you feel you need to go above or below the range provided, you may do so when submitting a pitch.
        </p>
        <p>
            We encourage clients and agencies to negotiate throughout the introductory phase and agree on terms that all parties are comfortable with.
        </p>`,
    },
    {
        title: 'Can I Join Breef If I Work for Another Company or Consult Part-Time?',
        description: `<p>
            Breef is focused on including agencies in the form of existing companies. This means you should have no existing conflicts that would prevent you from joining Breef. If you are an individual contractor or smaller company, please ensure that you have no existing employment or contractual restrictions that would prevent you from joining Breef and servicing our clients with the commitment they may require.
        </p>
        <p>
            If you knowingly (or unwittingly) violate a pre-existing contract or agreement by participating on Breef, Breef is not responsible for any liability or damages that may be incurred.
        </p>`,
    },
    {
        title: 'How Will I Know When I Receive a New Project?',
        description: `<p>
            You will be notified via email and your Breef Dashboard whenever you have been invited to a project.
        </p>
        <p>
            If you are interested in submitting a pitch, the project will be shared to your Breef Dashboard for your review. Within the project overview, you will find all the necessary materials including the submission deadline, budget, and deliverables.
        </p>
        <p>
            Please note, we only share each project opportunity with a handful of teams. This is a key part of the Breef Process to ensure both agencies and clients have the best chance of success.
        </p>`,
    },
    {
        title: 'What Are the Next Steps After I’ve Submitted a Pitch?',
        description: `<p>
            We only deliver a handful of pitches for each project. A client will often take a week or so to review the pitches  internally. If they are interested in learning more, we will arrange an introductory call where you can explore more about the project, budget, timing and their needs.
        </p>`,
    },
    {
        title: 'How Do Clients + Agencies Communicate During the Pitch Process?',
        description: `<p>
            If a Client would like to learn more about your Agency (i.e. you are shortlisted), a Breef team member will connect you for an introductory call and the final negotiation process. We encourage working through the Breef team to finalize terms and ensure that both parties are satisfied with the scope of work and team selection.
        </p>
        <p>
            Please note, it is against the Breef Terms of Use and our service policies to circumvent Breef’s process and approach a client directly about a project without coordinating through Breef.
        </p>`,
    },
    {
        title: 'How Do Clients + Agencies Communicate When a Project Starts?',
        description: `<p>
            Our main goal is to connect Agencies with project opportunities from leading and emerging brands. Once there is an agreement between the agency and the client to commence work, the relationship is between the two of you. Of course, the Breef Team is always here to check in, answer any questions + help with the payment process.
        </p>
        <p>
            Most communications with the client are encouraged over email, phone and video calls – whatever the team is most comfortable with. We find the most successful relationships happen when there are clear parameters around meetings, communication, and providing project progress updates.
        </p>
        <p>
            Please note it is against the Breef Terms of Use and our service policies to circumvent the Breef process and approach a client directly about a project without contracting through Breef.
        </p>`,
    },
    {
        title: 'How Do I Manage Project Deliverables?',
        description: `<p>
            We encourage clients and agencies to establish a timeline and process for delivery of various project deliverables. As the Agency, you are expected to meet the agreed deadlines and deliverable requirements in order to meet the high standard that Breef Clients expect. Keep in mind there may be project confidentiality requirements.
        </p>
        <p>
            As a reminder, all payments are managed through Breef, so you can structure your payments to be made before, after or upon completion of deliverables.
        </p>`,
    },
    {
        title: 'When Does an Agency Receive Payment?',
        description: `<p>
            All payments are made through Breef. It is up to clients and agencies  to negotiate when a payment is to occur. Through our payment system, parties can nominate when to release a payment. Release of payment must be approved by the client.
        </p>`,
    },
    {
        title: 'How Do I Provide Feedback About My Experience?',
        description: `<p>
            Our Client and Agency Leads will follow up with both the client and the agency upon completion of a project. We incorporate all feedback into improving our service and are always receptive to new ways to improve Breef.
        </p>`,
    },
    {
        title: 'What Happens If a Project Is Extended?',
        description: `<p>
            If your scope of work or project is extended, or a client engages your Agency for additional work within 12 months of the commencement of the initial project, you will need to let us know in accordance with our Terms of Use. All payments must be processed through the Breef Platform for the first 12 months.
        </p>
        <p>
            Please email your Curator with any new project and payment information at
            <a class="accent" href="mailto:teams@breef.com">
                    teams@breef.com.
                </a>
        </p>`,
    },
    {
        title: 'Are You Able to Share a Few Examples of Past Clients & Projects?',
        description: `<p>
        Absolutely. See a few of our case studies
        <a class="accent" href="https://www.breef.com/case-studies">
            here.
        </a>
    </p>`,
    },
];
export const policesAnswer = (role: AppRoleType): FaqAnswersListType => [
    {
        title: 'Standard Terms',
        description: `<p>
            When you partner with a client or agency through Breef, it is a requirement of our service that you add our Breef Project Exhibit to your agreement. The project exhibit contains a summary of key terms for your project (including parties, payments and fees), as well as terms and standards that you agree to meet in order to keep the Breef service operating to a high standard.
        </p>`,
    },
    {
        title: 'Site Confidentiality',
        description: `<p>
            All information contained on the Breef website and provided to you throughout the service by clients and/or agencies should be treated confidentially. Breef uses various security methods outlined in our Privacy Policy to protect user information.
        </p>
        <p>
            It is common for parties to sign confidentiality agreements prior to sensitive information being disclosed. We also allow Projects to be marked as "confidential," which means that we will not disclose the identity of that client until they seek to communicate with shortlisted Agency Talent.
        </p>`,
    },
    {
        title: 'What Is Breef’s Privacy Policy?',
        description: `<p>
            Breef takes privacy seriously. We have developed a detailed
            <a class="accent" href="/${role}/privacy-policy" target="_blank">
                    Privacy Policy
                </a>, which outlines how we
            collect and use your information. You can review that Privacy Policy
            <a class="accent" href="/${role}/privacy-policy" target="_blank">
                    here.
                </a>
        </p>`,
    },
    {
        title: 'Delivery of Work + Liability',
        description: `<p>
            Breef encourages clients and agency talent to ensure that they use the following when establishing a relationship:
        </p>
        <ul style="list-style-type: none; font-size: 16px;">
            <li>-&#8195; Clear deliverables and project timeline</li>
            <li>-&#8195; Milestones for payment and an agreed statement of work</li>
            <li>-&#8195; Communication about work progress and client expectations</li>
        </ul>
        <p>
            Our Project Exhibit also outlines standard terms for you to incorporate within your agreements so that you can
            continue to maintain the high standard of work expected within the Breef community.
        </p>`,
    },
    {
        title: 'Disputes',
        description: `<p>
            In the event of dispute, Breef  is here to help both clients and agencies work through any project issues.
        </p>
        <p>
            Please reach out to your Breef contact or email us at
            <a class="accent" href="mailto:projects@breef.com">
                    projects@breef.com.
            </a>
        </p>
        <p>
            While all disputes are ultimately to be resolved between the parties, we can help facilitate a line of
            communication when things don’t go as planned.
        </p>`,
    },
    {
        title: 'Deactivating Your Account',
        description: `<p>
            To deactivate your Breef account, please contact us at
            <a class="accent" href="mailto:support@breef.com">
                    support@breef.com.
            </a>
        </p>
        <p>
            Please note that all relevant Breef policies will continue to apply to you and your company even if you are no longer a user, for a period of twenty four (24) months from the date that you delete your account. This means that, under our
            <a class="accent" href="/${role}/terms-of-use" target="_blank">
                    Terms of Use
            </a>
            , you are not permitted to contract with clients and/or agencies that were introduced to you through Breef during those twelve months without paying the required fees to Breef.
        </p>
        <p>
            In the event that you contract with a Breef Client or Agency during the twelve-month period after your account is deactivated, or after you have been suspended or terminated from the Breef Platform, you will be subject to Breef’s
            <a class="accent" href="/${role}/terms-of-use" target="_blank">
                    Terms of Use
            </a>
            , payment procedures and other relevant policies. For more details, please view Breef’s
            <a class="accent" href="/${role}/terms-of-use" target="_blank">
                    Terms of Use.
                </a>
        </p>`,
    },
    {
        title: 'Engaging Outside of Breef',
        description: `<p>
            Breef's
            <a class="accent" href="/${role}/terms-of-use" target="_blank">
                    Terms of Use
            </a>
            strictly prohibit engaging or contracting between a client, agency or affiliated
            party in a manner that circumvents the Breef service. Please let us know at
            <a class="accent" href="mailto:support@breef.com">
                support@breef.com
            </a>
            if a party requests that you work outside of the operation of the Breef service.
        </p>
        <p>
            If it is found that a client or agency talent is violating the intention of this service rule, Breef shall suspend those parties from the Breef Platform, and we reserve our rights to pursue further action against the offending parties. For more information, please see our
            <a class="accent" href="/${role}/terms-of-use" target="_blank">
                    Terms of Use.
                </a>
        </p>`,
    },
    {
        title: 'Financial Information',
        description: `<p>
            Any financial information provided by you to Breef is stored securely at all times. Do not share any financial information outside of the Breef Platform. That’s one reason why we also require that all payments go through Breef.
        </p>`,
    },
    {
        title: 'Relevant Laws',
        description: `<p>
            The Breef Platform is governed by the laws of the United States of America, in particular the State of New York. All agreements between clients and agencies are subject to their applicable law clauses. Users of Breef are reminded that under our
            <a class="accent" href="/${role}/terms-of-use" target="_blank">
                    Terms of Use.
                </a>
            , they are not permitted to contract to exclude operation of the service or in a way which circumvents the operation of the service in relation to Projects, Pitches/Proposals, Payments and any other relevant service features.
        </p>`,
    },
    {
        title: 'Your Relationship With Breef',
        description: `<p>
            All Agencies and client participants are independent contractors of Breef. Anyone using the service does so in their own capacity at all times (and in the capacity of the companies that they represent). Under no circumstances are those parties to be considered an employee, agent, partner, legal representative or joint venture, or otherwise of Breef at any time.
        </p>
        <p>
            As outlined in our
            <a class="accent" href="/${role}/terms-of-use" target="_blank">
                    Terms of Use.
                </a>
            , Breef is not responsible for work undertaken as a result of Introductions made through the service. Clients and agencies are responsible for agreeing to scope of work and agreement of terms and deliverables.
        </p>`,
    },
    {
        title: 'Working with Agencies',
        description: `<p>
            Breef is supportive of measures within the community to provide minimum standards to flexible working arrangements. Should you have any questions in relation to our position, please reach out at
            <a class="accent" href="mailto:support@breef.com">
                    support@breef.com.
                </a>
        </p>`,
    },
];
