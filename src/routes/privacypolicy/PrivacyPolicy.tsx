import NavBar from "@components/NavBar"

const PrivacyPolicy: React.FC = () => {
	return (
		<>
			<main className="w-screen h-screen bg-Gradient1 overflow-x-hidden">
				<NavBar />
				<section className="bg-white/90 p-6 lg:p-8 w-[90dvw] mx-auto rounded-lg my-3 shadow-lg">
					<h1 className="font-Principal text-2xl text-center">
						Privacy Policy
					</h1>
					<p className="font-Secundaria pt-2">
						The BEESMRT website is owned by BEESMRT, which is a data controller
						of your personal data. We have adopted this Privacy Policy, which
						determines how we process information collected by BEESMRT, which
						also provides the reasons why we must collect certain personal data
						about you. Therefore, you should read this Privacy Policy before
						using the BEESMRT website. We care about your personal data and are
						committed to ensuring its confidentiality and security.
					</p>

					<h2 className="font-Principal py-2 text-2xl">
						Personal information that we collect:
					</h2>

					<div className="font-Secundaria">
						When you visit BEESMRT, we automatically collect certain information
						about your device:
						<div className="py-2" />
						<ul className="list-disc ml-4">
							<li className="mb-2">Information about your web browser</li>
							<li className="mb-2">IP address</li>
							<li className="mb-2">Zona horaria</li>
							<li className="mb-2">Cookies installed on your device</li>
						</ul>
					</div>

					<div className="font-Secundaria">
						<p className="pb-2">
							{" "}
							Additionally, as you browse the site, we collect information
							about:{" "}
						</p>
						<ul className="list-disc ml-4 mb-4">
							<li className="mb-2">
								The individual web pages or products you view
							</li>
							<li className="mb-2">
								What websites or search terms referred you to the site and how
								you interact with it
							</li>
						</ul>
						<p className="mb-4">
							We refer to this automatically collected information as "Device
							Information." Additionally, we may collect the personal data you
							provide to us during registration in order to fulfill the
							agreement
						</p>
						<ul className="list-disc ml-4">
							<li className="mb-2">Name</li>
							<li className="mb-2">Last name</li>
							<li className="mb-2">Address</li>
							<li className="mb-2">Payment information</li>
							<li className="mb-2">Among others</li>
						</ul>
					</div>

					<h2 className="text-2xl font-Principal pb-2">
						Why do we process your data?
					</h2>

					<p className="pb-2 font-Secundaria">
						Our top priority is the security of customer data and as such we may
						process only minimal user data, only to the extent absolutely
						necessary to maintain the website. The information collected
						automatically is used only to identify potential cases of abuse and
						establish statistical information about website usage. This
						statistical information is not aggregated in such a way as to
						identify any particular user of the system.
					</p>

					<p className="font-Secundaria">
						You can visit the site without telling us who you are or revealing
						any information by which someone could identify you as a specific
						person. However, if you wish to use some of the functions of the
						website, or wish to receive our newsletter or provide other details
						by filling out a form, you can provide us with personal data, such
						as your email, first name, last name, city of residence,
						organization and number of phone.
					</p>

					<p className="pt-2 font-Secundaria">
						You can choose not to provide your personal data, but you may not be
						able to take advantage of some of the website's features. For
						example, you will not be able to receive our newsletter or contact
						us directly from the website. Users who are unsure what information
						is required can contact us at angeljonasrosales@gmail.com.
					</p>

					<h2 className="py-2 text-2xl font-Principal">Your rights:</h2>

					<p className="font-Secundaria">
						If you are a European resident, you have the following rights
						related to your personal data:
					</p>

					<ul className="list-disc ml-4 mb-4 font-Secundaria">
						<li className="mb-2">The right to be informed</li>
						<li className="mb-2">The right of access</li>
						<li className="mb-2">The right to rectification</li>
						<li className="mb-2">The right to erase</li>
						<li className="mb-2">The right to restrict processing</li>
						<li className="mb-2">The right to data portability</li>
						<li className="mb-2">The right to object</li>
						<li className="mb-2">
							Rights in relation to automated decision making and profiling
						</li>
					</ul>

					<p className="pb-2 font-Secundaria">
						If you wish to exercise this right, please contact us using the
						contact information below.
					</p>

					<h2 className="pb-2 font-Secundaria">
						Additionally, if you are a European resident, we highlight that we
						are processing your information to fulfill contracts we might have
						with you (for example, if you place an order through the site), or
						otherwise to pursue our legitimate business interests listed above.
						Additionally, please note that your information may be transferred
						outside of Europe, including Canada and the United States.
					</h2>

					<ul className="list-disc ml-4 font-Secundaria">
						<li className="py-2">
							<h3 className="font-bold">Links to other websites:</h3>
							<p>
								Our site may contain links to other websites that are not owned
								or controlled by us. Please be aware that we are not responsible
								for such websites or the privacy practices of third parties. We
								encourage you to be aware when you leave our website and to read
								the privacy statements of each site that may collect personal
								information.
							</p>
						</li>

						<li className="py-2">
							<h3 className="font-bold">Security of the information:</h3>
							<p>
								We secure the information you provide on computer servers in a
								controlled, secure environment, protected from unauthorized
								access, use or disclosure. We maintain reasonable
								administrative, technical and physical security measures to
								protect against unauthorized access, use, modification and
								disclosure of personal data under its control and custody.
								However, data transmission over the Internet or wireless
								networks cannot be guaranteed.
							</p>
						</li>

						<li className="py-2">
							<h3 className="font-bold">Legal Disclosure:</h3>
							<p>
								We will disclose any information we collect, use or receive if
								required or permitted by law, such as to comply with a subpoena
								or similar legal process, and when we believe in good faith that
								disclosure is necessary to protect our rights, protect your
								safety or the safety of others, investigate fraud, or respond to
								a government request.
							</p>
						</li>

						<li className="py-2">
							<h3 className="font-bold">Contact information:</h3>
							<p>
								If you wish to contact us to understand more about this Policy
								or wish to contact us regarding any matter regarding individual
								rights and your personal information, you may email us at
								angeljonasrosales@gmail.com
							</p>
						</li>
					</ul>
				</section>
			</main>
		</>
	)
}

export default PrivacyPolicy
