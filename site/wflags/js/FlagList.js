
const countries = [["Afghanistan", "AFG"], ["Albania", "ALB"], ["Algeria", "DZA"], ["American Samoa", "ASM"], ["Andorra", "AND"], ["Angola", "AGO"], ["Anguilla", "AIA"], ["Antarctica", "ATA"], ["Antigua and Barbuda", "ATG"], ["Argentina", "ARG"], ["Armenia", "ARM"], ["Aruba", "ABW"], ["Australia", "AUS"], ["Austria", "AUT"], ["Azerbaijan", "AZE"], ["Bahamas", "BHS"], ["Bahrain", "BHR"], ["Bangladesh", "BGD"], ["Barbados", "BRB"], ["Belarus", "BLR"], ["Belgium", "BEL"], ["Belize", "BLZ"], ["Benin", "BEN"], ["Bermuda", "BMU"], ["Bhutan", "BTN"], ["Bolivia", "BOL"], ["Bosnia and Herzegovina", "BIH"], ["Botswana", "BWA"], ["Bouvet Island", "BVT"], ["Brazil", "BRA"], ["Bulgaria", "BGR"], ["Burkina Faso", "BFA"], ["Burundi", "BDI"], ["Cambodia", "KHM"], ["Cameroon", "CMR"], ["Canada", "CAN"], ["Cayman Islands", "CYM"], ["Central African Republic", "CAF"], ["Chad", "TCD"], ["Chile", "CHL"], ["China", "CHN"], ["Colombia", "COL"], ["Congo", "COG"], ["Cook Islands", "COK"], ["Costa Rica", "CRI"], ["Côte d'Ivoire", "CIV"], ["Croatia", "HRV"], ["Cuba", "CUB"], ["Curaçao", "CUW"], ["Cyprus", "CYP"], ["Czechia", "CZE"], ["Denmark", "DNK"], ["Djibouti", "DJI"], ["Dominica", "DMA"], ["Dominican Republic", "DOM"], ["Ecuador", "ECU"], ["Egypt", "EGY"], ["El Salvador", "SLV"], ["Equatorial Guinea", "GNQ"], ["Eritrea", "ERI"], ["Estonia", "EST"], ["Eswatini", "SWZ"], ["Ethiopia", "ETH"], ["Falkland Islands", "FLK"], ["Faroe Islands", "FRO"], ["Fiji", "FJI"], ["Finland", "FIN"], ["France", "FRA"], ["French Guiana", "GUF"], ["French Polynesia", "PYF"], ["Gabon", "GAB"], ["Gambia", "GMB"], ["Georgia", "GEO"], ["Germany", "DEU"], ["Ghana", "GHA"], ["Gibraltar", "GIB"], ["Greece", "GRC"], ["Greenland", "GRL"], ["Grenada", "GRD"], ["Guadeloupe", "GLP"], ["Guam", "GUM"], ["Guatemala", "GTM"], ["Guinea", "GIN"], ["Guinea-Bissau", "GNB"], ["Guyana", "GUY"], ["Haiti", "HTI"], ["Holy See", "VAT"], ["Honduras", "HND"], ["Hong Kong", "HKG"], ["Hungary", "HUN"], ["Iceland", "ISL"], ["India", "IND"], ["Indonesia", "IDN"], ["Iraq", "IRQ"], ["Ireland", "IRL"], ["Israel", "ISR"], ["Italy", "ITA"], ["Jamaica", "JAM"], ["Japan", "JPN"], ["Jordan", "JOR"], ["Kazakhstan", "KAZ"], ["Kenya", "KEN"], ["Kiribati", "KIR"], ["North Korea", "PRK"], ["South Korea", "KOR"], ["Kuwait", "KWT"], ["Kyrgyzstan", "KGZ"], ["Lao People's Democratic Republic", "LAO"], ["Latvia", "LVA"], ["Lebanon", "LBN"], ["Lesotho", "LSO"], ["Liberia", "LBR"], ["Libya", "LBY"], ["Liechtenstein", "LIE"], ["Lithuania", "LTU"], ["Luxembourg", "LUX"], ["Macao", "MAC"], ["Madagascar", "MDG"], ["Malawi", "MWI"], ["Malaysia", "MYS"], ["Maldives", "MDV"], ["Mali", "MLI"], ["Malta", "MLT"], ["Marshall Islands", "MHL"], ["Martinique", "MTQ"], ["Mauritania", "MRT"], ["Mauritius", "MUS"], ["Mayotte", "MYT"], ["Mexico", "MEX"], ["Micronesia (Federated States of)", "FSM"], ["Moldova (the Republic of)", "MDA"], ["Monaco", "MCO"], ["Mongolia", "MNG"], ["Montenegro", "MNE"], ["Montserrat", "MSR"], ["Morocco", "MAR"], ["Mozambique", "MOZ"], ["Myanmar", "MMR"], ["Namibia", "NAM"], ["Nauru", "NRU"], ["Nepal", "NPL"], ["Netherlands", "NLD"], ["New Caledonia", "NCL"], ["New Zealand", "NZL"], ["Nicaragua", "NIC"], ["Niger", "NER"], ["Nigeria", "NGA"], ["Niue", "NIU"], ["Norfolk Island", "NFK"], ["North Macedonia", "MKD"], ["Northern Mariana Islands", "MNP"], ["Norway", "NOR"], ["Oman", "OMN"], ["Pakistan", "PAK"], ["Palau", "PLW"], ["Panama", "PAN"], ["Papua New Guinea", "PNG"], ["Paraguay", "PRY"], ["Peru", "PER"], ["Philippines", "PHL"], ["Pitcairn", "PCN"], ["Poland", "POL"], ["Portugal", "PRT"], ["Puerto Rico", "PRI"], ["Qatar", "QAT"], ["Réunion", "REU"], ["Romania", "ROU"], ["Russian Federation", "RUS"], ["Rwanda", "RWA"], ["Saint Helena", "SHN"], ["Saint Kitts and Nevis", "KNA"], ["Saint Lucia", "LCA"], ["Samoa", "WSM"], ["San Marino", "SMR"], ["Sao Tome and Principe", "STP"], ["Saudi Arabia", "SAU"], ["Senegal", "SEN"], ["Serbia", "SRB"], ["Seychelles", "SYC"], ["Sierra Leone", "SLE"], ["Singapore", "SGP"], ["Slovakia", "SVK"], ["Slovenia", "SVN"], ["Solomon Islands", "SLB"], ["Somalia", "SOM"], ["South Africa", "ZAF"], ["Spain", "ESP"], ["Sri Lanka", "LKA"], ["Sudan", "SDN"], ["Suriname", "SUR"], ["Svalbard", "SJM"], ["Sweden", "SWE"], ["Switzerland", "CHE"], ["Syrian Arab Republic", "SYR"], ["Tajikistan", "TJK"], ["Tanzania", "TZA"], ["Thailand", "THA"], ["Timor-Leste", "TLS"], ["Togo", "TGO"], ["Tokelau", "TKL"], ["Tonga", "TON"], ["Trinidad and Tobago", "TTO"], ["Tunisia", "TUN"], ["Turkey", "TUR"], ["Turkmenistan", "TKM"], ["Turks and Caicos Islands", "TCA"], ["Tuvalu", "TUV"], ["Uganda", "UGA"], ["Ukraine", "UKR"], ["United Arab Emirates", "ARE"], ["United Kingdom", "GBR"], ["United States", "USA"], ["Uruguay", "URY"], ["Uzbekistan", "UZB"], ["Vanuatu", "VUT"], ["Venezuela (Bolivarian Republic of)", "VEN"], ["Viet Nam", "VNM"], ["Wallis and Futuna", "WLF"], ["Western Sahara", "ESH"], ["Yemen", "YEM"], ["Zambia", "ZMB"], ["Zimbabwe", "ZWE"], ["Taiwan", "TWN"]];

class CountryItem extends React.Component {
	constructor(props) {
		super(props);
		this.handle_click = this.handle_click.bind(this);
	}

	handle_click() {
		if (this.props.set_selected) this.props.set_selected(this.props.id);
	}

	render() {
		return React.createElement(
			"div",
			{ className: 'CountryItem ' + (this.props.selected ? 'selected' : ''), onClick: this.handle_click },
			React.createElement("img", { className: "country_image", src: 'flags/' + this.props.image.toLowerCase() + ".png" }),
			React.createElement(
				"span",
				{ className: "country_name" },
				this.props.name
			)
		);
	}

}

class FlagList extends React.Component {
	constructor(props) {
		super(props);
		this.set_selected = this.set_selected.bind(this);
		this.state = { selected_index: 4 };
	}

	set_selected(index) {
		const new_state = { selected_index: index };
		this.setState(new_state);
	}

	render() {

		return React.createElement(
			"div",
			{ className: "FlagListContainer" },
			countries.map((item, index) => {
				return React.createElement(CountryItem, { id: index, set_selected: this.set_selected, selected: this.state.selected_index == index, key: index, name: item[0], image: item[1] });
			})
		);
	}
}