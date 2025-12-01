import { AlignmentType, CheckBox, Document, ExternalHyperlink, FootnoteReferenceRun, HeadingLevel, ImageRun, LevelFormat, Math as Math$1, MathFraction, MathIntegral, MathRadical, MathRun, MathSubScript, MathSubSuperScript, MathSum, MathSuperScript, Packer, Paragraph, Table, TableCell, TableRow, TextRun, UnderlineType, VerticalAlign, WidthType, XmlComponent } from "./docx_9.5.1.mjs";
import katex from "./katex-0.16.min.mjs";
import { XMLParser } from "./fast-xml-parser_5.3.2.mjs";
import { Lexer } from "./marked.esm.min.js";

//#region src/styles/classes.ts
const classes = {
	Space: "MdSpace",
	Code: "MdCode",
	Hr: "MdHr",
	Blockquote: "MdBlockquote",
	Html: "MdHtml",
	Def: "MdDef",
	Paragraph: "MdParagraph",
	Text: "MdText",
	Footnote: "MdFootnote",
	ListItem: "MdListItem",
	Table: "MdTable",
	TableHeader: "MdTableHeader",
	TableCell: "MdTableCell",
	Heading1: "MdHeading1",
	Heading2: "MdHeading2",
	Heading3: "MdHeading3",
	Heading4: "MdHeading4",
	Heading5: "MdHeading5",
	Heading6: "MdHeading6",
	Tag: "MdTag",
	Link: "MdLink",
	Strong: "MdStrong",
	Em: "MdEm",
	Codespan: "MdCodespan",
	Del: "MdDel",
	Br: "MdBr"
};

//#endregion
//#region src/styles/colors.ts
const colors = {
	primary: "4472C4",
	secondary: "70AD47",
	accent1: "ED7D31",
	accent2: "A5A5A5",
	accent3: "FFC000",
	heading1: "2F5597",
	heading2: "5B9BD5",
	heading3: "44546A",
	link: "0563C1",
	code: "C7254E",
	blockquote: "666666",
	del: "FF0000"
};

//#endregion
//#region src/styles/markdown.ts
const markdown = {
	space: {
		className: classes.Space,
		run: { size: 12 },
		paragraph: { spacing: {
			before: 0,
			after: 0
		} }
	},
	code: {
		className: classes.Code,
		run: {
			font: "Courier New",
			size: 22,
			color: colors.secondary
		},
		paragraph: {
			border: {
				top: {
					style: "single",
					size: 1,
					color: colors.accent2,
					space: 8
				},
				bottom: {
					style: "single",
					size: 1,
					color: colors.accent2,
					space: 8
				},
				left: {
					style: "single",
					size: 1,
					color: colors.accent2,
					space: 8
				},
				right: {
					style: "single",
					size: 1,
					color: colors.accent2,
					space: 8
				}
			},
			spacing: {
				before: 200,
				after: 200
			}
		}
	},
	hr: {
		className: classes.Hr,
		paragraph: {
			border: { bottom: {
				style: "single",
				size: 1,
				color: colors.accent2,
				space: 1
			} },
			spacing: {
				before: 240,
				after: 240
			}
		}
	},
	blockquote: {
		className: classes.Blockquote,
		run: {
			color: colors.blockquote,
			italics: true
		},
		paragraph: {
			border: { left: {
				style: "single",
				size: 20,
				color: colors.accent2,
				space: 12
			} },
			indent: { left: 360 },
			spacing: {
				before: 200,
				after: 200
			}
		}
	},
	html: {
		className: classes.Html,
		run: {
			font: "Courier New",
			color: colors.accent1
		}
	},
	def: {
		className: classes.Def,
		paragraph: { indent: {
			left: 720,
			hanging: 360
		} }
	},
	paragraph: {
		className: classes.Paragraph,
		paragraph: { spacing: {
			before: 120,
			after: 120
		} }
	},
	text: { className: classes.Text },
	footnote: {
		className: classes.Footnote,
		run: { superScript: true }
	},
	listItem: {
		className: classes.ListItem,
		paragraph: {
			indent: {
				left: 720,
				hanging: 360
			},
			spacing: {
				before: 60,
				after: 60
			}
		}
	},
	table: {
		className: classes.Table,
		paragraph: { spacing: {
			before: 60,
			after: 60
		} }
	},
	tableHeader: {
		className: classes.TableHeader,
		properties: { shading: { fill: "F1F2F1" } },
		run: { bold: true }
	},
	tableCell: { className: classes.TableCell },
	heading1: {
		className: classes.Heading1,
		run: {
			size: 36,
			bold: true,
			color: colors.heading1
		},
		paragraph: {
			spacing: {
				before: 480,
				after: 240
			},
			keepNext: true,
			outlineLevel: 0
		}
	},
	heading2: {
		className: classes.Heading2,
		run: {
			size: 32,
			bold: true,
			color: colors.heading2
		},
		paragraph: {
			spacing: {
				before: 400,
				after: 200
			},
			keepNext: true,
			outlineLevel: 1
		}
	},
	heading3: {
		className: classes.Heading3,
		run: {
			size: 28,
			bold: true,
			color: colors.heading3
		},
		paragraph: {
			spacing: {
				before: 320,
				after: 160
			},
			keepNext: true,
			outlineLevel: 2
		}
	},
	heading4: {
		className: classes.Heading4,
		run: {
			size: 26,
			bold: true,
			color: colors.heading3
		},
		paragraph: {
			spacing: {
				before: 280,
				after: 140
			},
			keepNext: true,
			outlineLevel: 3
		}
	},
	heading5: {
		className: classes.Heading5,
		run: {
			size: 24,
			bold: true,
			italics: true,
			color: colors.heading3
		},
		paragraph: {
			spacing: {
				before: 240,
				after: 120
			},
			keepNext: true,
			outlineLevel: 4
		}
	},
	heading6: {
		className: classes.Heading6,
		run: {
			size: 24,
			bold: false,
			italics: true,
			color: colors.heading3
		},
		paragraph: {
			spacing: {
				before: 240,
				after: 120
			},
			keepNext: true,
			outlineLevel: 5
		}
	},
	tag: {
		inline: true,
		className: classes.Tag,
		run: {
			font: "Courier New",
			color: colors.accent1
		}
	},
	link: {
		inline: true,
		className: classes.Link,
		run: {
			color: colors.link,
			underline: { type: UnderlineType.SINGLE }
		}
	},
	strong: {
		inline: true,
		className: classes.Strong,
		run: { bold: true }
	},
	em: {
		inline: true,
		className: classes.Em,
		run: { italics: true }
	},
	codespan: {
		inline: true,
		className: classes.Codespan,
		run: {
			font: "Courier New",
			color: colors.secondary
		}
	},
	del: {
		inline: true,
		className: classes.Del,
		run: {
			strike: true,
			color: colors.del
		}
	},
	br: {
		inline: true,
		className: classes.Br
	}
};

//#endregion
//#region src/styles/numbering.ts
const numbering = { config: [{
	reference: "numbering-points",
	levels: [
		makeNumbering(0),
		makeNumbering(1),
		makeNumbering(2),
		makeNumbering(3),
		makeNumbering(4),
		makeNumbering(5),
		makeNumbering(6),
		makeNumbering(7),
		makeNumbering(8)
	]
}, {
	reference: "bullet-points",
	levels: [
		makeBullet(0, "•"),
		makeBullet(1, "■"),
		makeBullet(2, "▶"),
		makeBullet(3, "▲"),
		makeBullet(4, "◆"),
		makeBullet(5, "●"),
		makeBullet(6, "□")
	]
}] };
function makeNumbering(level) {
	return {
		level,
		format: LevelFormat.DECIMAL,
		text: level < 1 ? "%1" : level < 2 ? "%1.%2" : level < 3 ? "%1.%2.%3" : `%${level + 1})`
	};
}
function makeBullet(level, charset) {
	return {
		level,
		format: LevelFormat.BULLET,
		text: charset
	};
}

//#endregion
//#region src/styles/styles.ts
const defaultStyle = {
	document: {
		run: { size: 24 },
		paragraph: { spacing: { lineRule: "auto" } }
	},
	hyperlink: { run: {
		color: colors.link,
		underline: {
			type: UnderlineType.SINGLE,
			color: colors.link
		}
	} },
	heading1: {},
	heading2: {},
	heading3: {},
	heading4: {},
	heading5: {},
	heading6: {},
	strong: {},
	listParagraph: {},
	footnoteReference: {},
	footnoteText: {},
	footnoteTextChar: {},
	title: {}
};
function createDocumentStyle(options) {
	const paragraphStyles = [];
	const characterStyles = [];
	const keys = Object.keys(markdown);
	for (const key of keys) {
		const style = markdown[key];
		if (!style) continue;
		const { className, run, inline, paragraph, basedOn = "Normal", next = "Normal", quickFormat = true } = style;
		if (inline) characterStyles.push({
			id: className,
			name: className,
			basedOn,
			next,
			quickFormat,
			run
		});
		else paragraphStyles.push({
			id: className,
			name: className,
			basedOn,
			next,
			quickFormat,
			run,
			paragraph
		});
	}
	return {
		default: defaultStyle,
		paragraphStyles,
		characterStyles,
		...options
	};
}

//#endregion
//#region src/styles/index.ts
const styles = {
	colors,
	classes,
	default: defaultStyle,
	markdown,
	numbering
};

//#endregion
//#region src/renders/render-list.ts
const countSymbol = Symbol();
function renderList(render, block, attr) {
	let instance = void 0;
	if (block.ordered) {
		instance = (render.store.get(countSymbol) || 0) + 1;
		render.store.set(countSymbol, instance);
	}
	const list = {
		level: typeof attr.list?.level === "number" ? attr.list.level + 1 : 0,
		type: block.ordered ? "number" : "bullet",
		instance
	};
	return block.items.map((item) => {
		const tokens = item.tokens;
		return renderBlocks(render, tokens, {
			...attr,
			style: classes.ListItem,
			list: {
				...list,
				task: item.task,
				checked: item.checked
			}
		});
	}).flat();
}

//#endregion
//#region src/utils.ts
function getHeadingLevel(level) {
	if (level == null) return;
	switch (level) {
		case 0: return HeadingLevel.TITLE;
		case 1: return HeadingLevel.HEADING_1;
		case 2: return HeadingLevel.HEADING_2;
		case 3: return HeadingLevel.HEADING_3;
		case 4: return HeadingLevel.HEADING_4;
		case 5: return HeadingLevel.HEADING_5;
		case 6: return HeadingLevel.HEADING_6;
		default: return HeadingLevel.HEADING_6;
	}
}
function getTextAlignment(align) {
	switch (align) {
		case "left": return AlignmentType.LEFT;
		case "center": return AlignmentType.CENTER;
		case "right": return AlignmentType.RIGHT;
		default: return;
	}
}
function getImageTokens(tokenList, tokens = []) {
	for (const token of tokenList) {
		if (!token) continue;
		switch (token.type) {
			case "image":
				tokens.push(token);
				break;
			case "table":
				if (token.header?.length) getImageTokens(token.header, tokens);
				if (token.rows?.length) for (const row of token.rows) getImageTokens(row, tokens);
				break;
			default:
				if (token.tokens?.length) getImageTokens(token.tokens, tokens);
				break;
		}
	}
	return tokens;
}
const ImageTypeWhitelist = new Set([
	"jpg",
	"png",
	"gif",
	"bmp",
	"webp"
]);
function getImageExtension(filename = "", mime) {
	let ext = "";
	switch (mime) {
		case "image/jpeg":
			ext = "jpg";
			break;
		case "image/png":
			ext = "png";
			break;
		case "image/gif":
			ext = "gif";
			break;
		case "image/bmp":
			ext = "bmp";
			break;
		case "image/webp":
			ext = "webp";
			break;
		case "image/svg+xml":
			ext = "svg";
			break;
		default:
			const name = filename.split("?").pop() || "";
			const index = name.lastIndexOf(".");
			if (index > -1) ext = name.substring(index + 1);
			break;
	}
	if (!ext) throw new Error(`Cannot get Image extension from mime type: ${mime}`);
	else if (!ImageTypeWhitelist.has(ext)) throw new Error(`Image extension ${ext} is not supported`);
	return ext;
}

//#endregion
//#region src/renders/render-checkbox.ts
function renderCheckbox(render, checked) {
	return new CheckBox({
		checked: !!checked,
		checkedState: {
			value: "2611",
			font: "MS Gothic"
		},
		uncheckedState: {
			value: "2610",
			font: "MS Gothic"
		}
	});
}

//#endregion
//#region src/renders/render-text.ts
function renderText(render, text, attr) {
	const multipleLines = text.trim().split(/\n/);
	const totalLine = multipleLines.length;
	const options = {
		style: attr.style,
		italics: attr.italics,
		bold: attr.bold,
		underline: attr.underline ? {} : void 0,
		strike: attr.strike,
		break: attr.break ? typeof attr.break === "number" ? attr.break : 1 : void 0
	};
	if (attr.strong) options.bold = true;
	if (attr.em) options.italics = true;
	if (attr.codespan) options.underline = {};
	if (attr.del) options.strike = true;
	if (totalLine > 1) {
		const textNodes = [];
		textNodes.push(...multipleLines.map((line, index) => new TextRun({
			...options,
			text: line,
			break: index > 0 ? 1 : void 0
		})));
		return textNodes;
	}
	return [new TextRun({
		text,
		...options
	})];
}

//#endregion
//#region src/renders/render-image.ts
function renderImage(render, block, attr) {
	if (render.ignoreImage) return false;
	const image = render.findImage(block);
	if (!image || !image.type) return renderText(render, `[!${block.text}](${block.href})`, attr);
	return new ImageRun({
		type: image.type,
		data: image.data,
		transformation: {
			width: image.width,
			height: image.height
		},
		altText: {
			title: block.title || block.text,
			description: block.text,
			name: block.text
		}
	});
}

//#endregion
//#region src/renders/render-tokens.ts
function renderTokens(render, tokens, attr = {}) {
	const children = [];
	for (const token of tokens) {
		const child = flatInlineToken(render, token, attr);
		if (Array.isArray(child)) children.push(...child);
		else if (child) children.push(child);
		else if (child == null) console.warn(`Inline token is empty: ${token.type}`);
	}
	return children;
}
function flatInlineToken(render, token, attr) {
	switch (token.type) {
		case "escape": return renderText(render, token.text, attr);
		case "html":
			if (render.ignoreHtml) return false;
			return renderText(render, token.text, {
				...attr,
				html: true,
				style: classes.Tag
			});
		case "link": return new ExternalHyperlink({
			children: renderTokens(render, token.tokens, {
				...attr,
				link: true,
				style: classes.Link
			}),
			link: token.href
		});
		case "em": return renderTokens(render, token.tokens, {
			...attr,
			em: true,
			style: classes.Em
		});
		case "strong": return renderTokens(render, token.tokens, {
			...attr,
			strong: true,
			style: classes.Strong
		});
		case "codespan": return renderText(render, token.text, {
			...attr,
			codespan: true,
			style: classes.Code
		});
		case "br": return renderText(render, "", {
			break: 1,
			br: true,
			style: classes.Br
		});
		case "del": return renderTokens(render, token.tokens, {
			...attr,
			del: true,
			style: classes.Del
		});
		case "text":
			if (token.tokens?.length) return renderTokens(render, token.tokens, attr);
			return renderText(render, token.text, attr);
		case "image": return renderImage(render, token, attr);
		default: return render.useInlineRender(token, attr);
	}
}

//#endregion
//#region src/renders/render-paragraph.ts
function renderParagraph(render, tokens, attr) {
	const heading = getHeadingLevel(attr.heading);
	const alignment = getTextAlignment(attr.align);
	const hasList = !attr.listNone && attr.list;
	const options = {
		heading,
		alignment,
		bullet: hasList && attr.list?.type === "bullet" ? { level: Math.min(attr.list.level, 9) } : void 0,
		numbering: hasList && attr.list?.type === "number" ? {
			level: Math.min(attr.list.level, 9),
			reference: "numbering-points",
			instance: attr.list.instance
		} : void 0,
		style: attr.style
	};
	const children = typeof tokens === "string" ? renderText(render, tokens, {}) : renderTokens(render, tokens, {});
	if (attr.list?.task) children.unshift(renderCheckbox(render, attr.list.checked));
	return new Paragraph({
		children,
		...options
	});
}

//#endregion
//#region src/renders/render-table.ts
function renderTable(render, block, attrs) {
	const toProps = (token, isHeader) => {
		return {
			...attrs,
			align: token?.align,
			style: isHeader ? classes.TableHeader : classes.TableCell
		};
	};
	const style = render.styles.markdown;
	const defaultColumnWidth = 100 / block.header.length * 100;
	return new Table({
		...style.table.properties,
		style: classes.Table,
		width: {
			size: "100%",
			type: WidthType.PERCENTAGE
		},
		columnWidths: block.header.map(() => defaultColumnWidth),
		rows: [new TableRow({
			tableHeader: true,
			cantSplit: true,
			children: block.header.map((cell) => {
				return new TableCell({
					verticalAlign: VerticalAlign.CENTER,
					...style.tableHeader.properties,
					children: [renderParagraph(render, cell.tokens, toProps(cell, true))]
				});
			})
		}), ...block.rows.map((row) => {
			return new TableRow({
				cantSplit: true,
				children: row.map((cell) => {
					return new TableCell({
						verticalAlign: VerticalAlign.CENTER,
						...style.tableCell.properties,
						children: [renderParagraph(render, cell.tokens, toProps(cell))]
					});
				})
			});
		})]
	});
}

//#endregion
//#region src/extensions/mathml-to-docx.ts
let LO_COMPAT = false;
var MathMatrixElement = class extends XmlComponent {
	constructor(children) {
		super("m:e");
		for (const child of children) this.root.push(child);
	}
};
var MathMatrixRow = class extends XmlComponent {
	constructor(cells) {
		super("m:mr");
		for (const cell of cells) this.root.push(new MathMatrixElement(cell));
	}
};
var MathMatrix = class extends XmlComponent {
	constructor(rows) {
		super("m:m");
		for (const row of rows) this.root.push(new MathMatrixRow(row));
	}
};
function mathmlToDocxChildren(mathml, opts) {
	const mathNode = findFirst(new XMLParser({
		ignoreAttributes: false,
		attributeNamePrefix: "",
		textNodeName: "text",
		preserveOrder: true,
		trimValues: false
	}).parse(mathml), "math");
	LO_COMPAT = !!opts?.libreOfficeCompat;
	if (!mathNode) return [];
	const semantics = findFirst(childrenOf(mathNode), "semantics");
	return walkChildren(childrenOf(semantics ? findFirst(childrenOf(semantics), "mrow") || semantics : findFirst(childrenOf(mathNode), "mrow") || mathNode));
}
function walkChildren(nodes) {
	let out = [];
	for (let i = 0; i < nodes.length; i++) {
		const n = nodes[i];
		const tag = tagName(n);
		if (tag === "munderover" || tag === "munder" || tag === "mover") {
			const kids = childrenOf(n);
			const moNode = findFirst(kids, "mo");
			const opText = moNode ? directText(childrenOf(moNode)) : "";
			const lower = tag !== "mover" ? kids[1] ? walkNode(kids[1]) : [] : [];
			const upper = tag !== "munder" ? kids[2] ? walkNode(kids[2]) : [] : [];
			const base = walkChildren(nodes.slice(i + 1));
			if (opText.includes("∑")) {
				if (LO_COMPAT) out.push(...naryAsSubSup("∑", lower, upper, base));
				else out.push(new MathSum({
					children: base,
					subScript: lower,
					superScript: upper
				}));
				break;
			}
			if (opText.includes("∫")) {
				if (LO_COMPAT) out.push(...naryAsSubSup("∫", lower, upper, base));
				else out.push(new MathIntegral({
					children: base,
					subScript: lower,
					superScript: upper
				}));
				break;
			}
		}
		if (tag === "msubsup") {
			const ks = childrenOf(n);
			const base = ks[0];
			if (tagName(base) === "mo") {
				const op = directText(childrenOf(base));
				const lower = ks[1] ? walkNode(ks[1]) : [];
				const upper = ks[2] ? walkNode(ks[2]) : [];
				const body = walkChildren(nodes.slice(i + 1));
				if (op.includes("∑")) {
					out.push(...LO_COMPAT ? naryAsSubSup("∑", lower, upper, body) : [new MathSum({
						children: body,
						subScript: lower,
						superScript: upper
					})]);
					break;
				}
				if (op.includes("∫")) {
					out.push(...LO_COMPAT ? naryAsSubSup("∫", lower, upper, body) : [new MathIntegral({
						children: body,
						subScript: lower,
						superScript: upper
					})]);
					break;
				}
			}
		}
		out = out.concat(walkNode(n));
	}
	return out;
}
function walkNode(node) {
	const tag = tagName(node);
	if (!tag) {
		const t = node.text?.toString() || "";
		return t ? [new MathRun(t)] : [];
	}
	const kids = childrenOf(node);
	switch (tag) {
		case "mrow": return walkChildren(kids);
		case "mi":
		case "mn":
		case "mo": return textFrom(kids);
		case "msup": {
			const [base, sup] = firstN(kids, 2);
			return [new MathSuperScript({
				children: walkNode(base),
				superScript: walkNode(sup)
			})];
		}
		case "msub": {
			const [base, sub] = firstN(kids, 2);
			return [new MathSubScript({
				children: walkNode(base),
				subScript: walkNode(sub)
			})];
		}
		case "msubsup": {
			const [base, sub, sup] = firstN(kids, 3);
			return [new MathSubSuperScript({
				children: walkNode(base),
				subScript: walkNode(sub),
				superScript: walkNode(sup)
			})];
		}
		case "mfrac": {
			const [num, den] = firstN(kids, 2);
			return [new MathFraction({
				numerator: walkNode(num),
				denominator: walkNode(den)
			})];
		}
		case "msqrt": {
			const [body] = firstN(kids, 1);
			return [new MathRadical({ children: walkNode(body) })];
		}
		case "mroot": {
			const [body, degree] = firstN(kids, 2);
			return [new MathRadical({
				children: walkNode(body),
				degree: walkNode(degree)
			})];
		}
		case "mtable": {
			const rows = kids.filter((k) => tagName(k) === "mtr");
			if (LO_COMPAT) {
				const parts = [];
				parts.push(new MathRun("["));
				rows.forEach((row, ri) => {
					if (ri > 0) parts.push(new MathRun("; "));
					childrenOf(row).filter((c) => tagName(c) === "mtd").forEach((cell, ci) => {
						if (ci > 0) parts.push(new MathRun(", "));
						parts.push(...walkChildren(childrenOf(cell)));
					});
				});
				parts.push(new MathRun("]"));
				return parts;
			}
			return [new MathMatrix(rows.map((row) => {
				return childrenOf(row).filter((c) => tagName(c) === "mtd").map((cell) => walkChildren(childrenOf(cell)));
			}))];
		}
		case "munderover":
		case "munder":
		case "mover": {
			const m = childrenOf(node);
			const op = textFrom(childrenOf(findFirst(m, "mo") || {}));
			const low = tag !== "mover" ? m[1] ? walkNode(m[1]) : [] : [];
			const up = tag !== "munder" ? m[2] ? walkNode(m[2]) : [] : [];
			return op.concat(low).concat(up);
		}
		default: return walkChildren(kids);
	}
}
function tagName(node) {
	return Object.keys(node).filter((k) => k !== "text" && k !== ":@")[0] || null;
}
function childrenOf(node) {
	const tag = tagName(node);
	if (!tag) return [];
	const val = node[tag];
	return Array.isArray(val) ? val : val ? [val] : [];
}
function textFrom(nodes) {
	const texts = nodes.map((n) => (n.text ?? "").toString()).join("");
	return texts ? [new MathRun(texts)] : [];
}
function directText(nodes) {
	return nodes.map((n) => (n.text ?? "").toString()).join("");
}
function naryAsSubSup(op, lower, upper, body) {
	return [new MathSubSuperScript({
		children: [new MathRun(op)],
		subScript: lower,
		superScript: upper
	}), ...body];
}
function findFirst(nodes, name) {
	for (const n of nodes) {
		if (tagName(n) === name) return n;
		const inner = findFirst(childrenOf(n), name);
		if (inner) return inner;
	}
	return null;
}
function firstN(nodes, n) {
	return nodes.slice(0, n);
}

//#endregion
//#region src/renders/render-blocks.ts
function renderBlocks(render, blocks, attr = {}) {
	const paragraphs = [];
	for (const block of blocks) {
		const child = renderBlock$2(render, block, attr);
		if (Array.isArray(child)) paragraphs.push(...child);
		else if (child) paragraphs.push(child);
		else if (child == null) console.warn(`Block is empty: ${block.type}`);
	}
	return paragraphs;
}
function renderBlock$2(render, block, attr) {
	switch (block.type) {
		case "space": return new Paragraph({
			text: "",
			style: classes.Space
		});
		case "code": {
			const lang = block.lang?.trim().toLowerCase();
			if (lang && /^(math|latex|katex)$/.test(lang)) {
				const tex = block.text.trim();
				if (render.options?.math?.engine === "katex") try {
					const children = mathmlToDocxChildren(katex.renderToString(tex, {
						output: "mathml",
						throwOnError: false,
						displayMode: true,
						...render.options.math?.katexOptions || {}
					}), { libreOfficeCompat: !!render.options.math?.libreOfficeCompat });
					if (children && children.length) return new Paragraph({
						children: [new Math$1({ children })],
						style: classes.Paragraph
					});
				} catch {}
				return renderParagraph(render, tex, {
					...attr,
					code: true,
					style: "MdCode",
					listNone: true
				});
			}
			return renderParagraph(render, block.text, {
				...attr,
				code: true,
				style: "MdCode",
				listNone: true
			});
		}
		case "heading": return renderParagraph(render, block.tokens, {
			...attr,
			heading: block.depth,
			style: classes[`Heading${block.depth}`]
		});
		case "hr": return new Paragraph({
			text: "",
			thematicBreak: true,
			style: classes.Hr
		});
		case "blockquote": return renderBlocks(render, block.tokens, {
			...attr,
			listNone: true,
			blockquote: true,
			style: classes.Blockquote
		});
		case "list": return renderList(render, block, attr);
		case "html":
			if (render.ignoreHtml) return false;
			return renderParagraph(render, block.text, {
				...attr,
				code: true,
				style: classes.Html
			});
		case "def": return new Paragraph({
			text: block.title,
			style: classes.Def
		});
		case "table": return renderTable(render, block, {
			...attr,
			listNone: true
		});
		case "paragraph": return renderParagraph(render, block.tokens, {
			style: classes.Paragraph,
			...attr
		});
		case "text":
			if (block.tokens?.length) return renderParagraph(render, block.tokens, {
				style: classes.Text,
				...attr
			});
			return renderParagraph(render, block.text, attr);
		default: return render.useBlockRender(block, attr);
	}
}

//#endregion
//#region src/extensions/footnote.ts
/**
* @see https://github.com/bent10/marked-extensions/blob/main/packages/footnote/src/footnote.ts
*/
function footnote(lexer) {
	let hasFootnotes = false;
	let footnoteId = 0;
	const footnotes = /* @__PURE__ */ new Map();
	return {
		name: "footnote",
		init,
		block: tokenizerBlock,
		inline: tokenizerInline
	};
	function tokenizerBlock(src) {
		const match = /^\[\^([^\]\n]+)\]:(?:[ \t]+|[\n]*?|$)([^\n]*?(?:\n|$)(?:\n*?[ ]{4,}[^\n]*)*)/.exec(src);
		if (!match) return;
		if (!hasFootnotes) {
			hasFootnotes = true;
			footnoteId = 0;
			footnotes.clear();
		}
		const [raw, label, text = ""] = match;
		let content = text.split("\n").reduce((acc, curr) => {
			return acc + "\n" + curr.replace(/^(?:[ ]{4}|[\t])/, "");
		}, "");
		const contentLastLine = content.trimEnd().split("\n").pop();
		content += contentLastLine && /^[ \t]*?[>\-*][ ]|[`]{3,}$|^[ \t]*?[|].+[|]$/.test(contentLastLine) ? "\n\n" : "";
		const token = {
			id: ++footnoteId,
			type: "footnote",
			raw,
			label,
			tokens: lexer.blockTokens(content.trim())
		};
		footnotes.set(label, token);
		return token;
	}
	function tokenizerInline(src) {
		const match = /^\[\^([^\]\n]+)\]/.exec(src);
		if (match) {
			const [raw, label] = match;
			const note = footnotes.get(label);
			if (!note) return;
			return {
				id: note.id,
				type: "footnoteRef",
				raw,
				label
			};
		}
	}
}
function init(render) {
	render.addInlineRender("footnoteRef", renderInline$1);
	render.addBlockRender("footnote", renderBlock$1);
}
function renderInline$1(render, token, attr) {
	return new FootnoteReferenceRun(token.id);
}
function renderBlock$1(render, block, attr) {
	const noteList = render.toBlocks(block.tokens, {
		...attr,
		style: classes.Footnote,
		footnote: true
	});
	render.addFootnote(block.id, noteList);
	return false;
}

//#endregion
//#region src/extensions/latex.ts
const inlineRule = /^(\${1,2})(?!\$)((?:\\.|[^\\\n])*?(?:\\.|[^\\\n\$]))\1(?=[\s?!\.,:？！。，：]|$)/;
const blockRule = /^(\${1,2})\n((?:\\[^]|[^\\])+?)\n\1(?:\n|$)/;
function latex(lexer) {
	const ruleReg = inlineRule;
	return {
		name: "latex",
		startInline: (src) => {
			let index;
			let indexSrc = src;
			while (indexSrc) {
				index = indexSrc.indexOf("$");
				if (index === -1) return;
				if (index === 0 || indexSrc.charAt(index - 1) === " ") {
					if (indexSrc.substring(index).match(ruleReg)) return index;
				}
				indexSrc = indexSrc.substring(index + 1).replace(/^\$+/, "");
			}
		},
		inline: (src, tokens) => {
			const match = src.match(ruleReg);
			if (!match) return;
			return {
				type: "inlineKatex",
				raw: match[0],
				text: match[2].trim(),
				displayMode: match[1].length === 2
			};
		},
		block: (src, tokens) => {
			const match = src.match(blockRule);
			if (!match) return;
			return {
				type: "blockKatex",
				raw: match[0],
				text: match[2].trim(),
				displayMode: match[1].length === 2
			};
		},
		init: (render) => {
			render.addInlineRender("inlineKatex", renderInline);
			render.addBlockRender("blockKatex", renderBlock);
		}
	};
}
const macroMap = new Map([
	["alpha", "α"],
	["beta", "β"],
	["gamma", "γ"],
	["delta", "δ"],
	["epsilon", "ε"],
	["zeta", "ζ"],
	["eta", "η"],
	["theta", "θ"],
	["iota", "ι"],
	["kappa", "κ"],
	["lambda", "λ"],
	["mu", "μ"],
	["nu", "ν"],
	["xi", "ξ"],
	["omicron", "ο"],
	["pi", "π"],
	["rho", "ρ"],
	["sigma", "σ"],
	["tau", "τ"],
	["upsilon", "υ"],
	["phi", "φ"],
	["chi", "χ"],
	["psi", "ψ"],
	["omega", "ω"],
	["textasciitilde", "~"],
	["textbackslash", "\\"],
	["textasciicircum", "^"],
	["textbar", "|"],
	["textless", "<"],
	["textgreater", ">"],
	["textunderscore", "_"],
	["neq", "≠"],
	["leq", "≤"],
	["leqq", "≦"],
	["geq", "≥"],
	["geqq", "≧"],
	["sim", "∼"],
	["simeq", "≃"],
	["approx", "≈"],
	["infty", "∞"],
	["fallingdotseq", "≒"],
	["risingdotseq", "≓"],
	["equiv", "≡"],
	["ll", "≪"],
	["gg", "≫"],
	["times", "×"],
	["div", "÷"],
	["pm", "±"],
	["mp", "∓"],
	["oplus", "⊕"],
	["otimes", "⊗"],
	["ominus", "⊖"],
	["oslash", "⊘"],
	["odot", "⊙"],
	["circ", "∘"],
	["bullet", "•"],
	["cdot", "⋅"],
	["ltimes", "⋉"],
	["rtimes", "⋊"],
	["in", "∈"],
	["notin", "∉"],
	["ni", "∋"],
	["notni", "∌"]
]);
/**
* Parse LaTeX text and convert to simple text representation
* This is a basic implementation that handles common LaTeX commands
*/
function parseLatexToText(latex$1) {
	let text = latex$1;
	for (const [macro, symbol] of macroMap.entries()) {
		const regex = new RegExp(`\\\\${macro}(?![a-zA-Z])`, "g");
		text = text.replace(regex, symbol);
	}
	text = text.replace(/\^(\d)/g, (_, digit) => {
		return "⁰¹²³⁴⁵⁶⁷⁸⁹"[parseInt(digit)];
	});
	text = text.replace(/_(\d)/g, (_, digit) => {
		return "₀₁₂₃₄₅₆₇₈₉"[parseInt(digit)];
	});
	text = text.replace(/\^{([^}]+)}/g, "^$1");
	text = text.replace(/_{([^}]+)}/g, "_$1");
	text = text.replace(/\\([a-zA-Z]+)/g, "$1");
	text = text.replace(/[{}]/g, "");
	return text;
}
function renderInline(render, token) {
	const text = token.text;
	if (render.options?.math?.engine === "katex") try {
		const children = mathmlToDocxChildren(katex.renderToString(text, {
			output: "mathml",
			throwOnError: false,
			displayMode: !!token.displayMode,
			...render.options.math?.katexOptions || {}
		}), { libreOfficeCompat: !!render.options.math?.libreOfficeCompat });
		if (children && children.length) return new Math$1({ children });
	} catch {}
	let parsedText = parseLatexToText(text);
	if (!parsedText) parsedText = text;
	if (!parsedText) return new TextRun(text || "");
	return new Math$1({ children: [new MathRun(parsedText)] });
}
function renderBlock(render, token) {
	const text = token.text;
	if (render.options?.math?.engine === "katex") try {
		const children = mathmlToDocxChildren(katex.renderToString(text, {
			output: "mathml",
			throwOnError: false,
			displayMode: !!token.displayMode,
			...render.options.math?.katexOptions || {}
		}), { libreOfficeCompat: !!render.options.math?.libreOfficeCompat });
		if (children && children.length) return new Paragraph({ children: [new Math$1({ children })] });
	} catch {}
	let parsedText = parseLatexToText(text);
	if (!parsedText) parsedText = text;
	if (!parsedText) return new Paragraph({ children: [new TextRun(text || "")] });
	return new Paragraph({ children: [new Math$1({ children: [new MathRun(parsedText)] })] });
}

//#endregion
//#region src/extensions/index.ts
function useExtensions(render) {
	const lexer = new Lexer(render.options);
	usePlugin(render, lexer, footnote);
	usePlugin(render, lexer, latex);
	return lexer;
}
function usePlugin(render, lexer, fn) {
	const plugin = fn(lexer);
	const extensions = lexer.options.extensions || (lexer.options.extensions = {});
	if (plugin.startBlock) (extensions.startBlock || (extensions.startBlock = [])).push(plugin.startBlock);
	if (plugin.startInline) (extensions.startInline || (extensions.startInline = [])).push(plugin.startInline);
	if (plugin.block) (extensions.block || (extensions.block = [])).push(plugin.block);
	if (plugin.inline) (extensions.inline || (extensions.inline = [])).push(plugin.inline);
	if (plugin.init) plugin.init(render);
}

//#endregion
//#region src/tokenize.ts
function tokenize(render) {
	return useExtensions(render).lex(render.markdown);
}

//#endregion
//#region src/MarkdownDocx.ts
var MarkdownDocx = class MarkdownDocx {
	static {
		this.defaultOptions = {
			gfm: true,
			math: { engine: "katex" }
		};
	}
	static covert(markdown$1, _options = {}) {
		return new MarkdownDocx(markdown$1, _options).toDocument();
	}
	constructor(markdown$1, options = {}) {
		this.markdown = markdown$1;
		this.options = options;
		this.styles = styles;
		this.store = /* @__PURE__ */ new Map();
		this._imageStore = /* @__PURE__ */ new Map();
		this.footnotes = {};
		this._blockRender = /* @__PURE__ */ new Map();
		this._inlineRender = /* @__PURE__ */ new Map();
		this.options = {
			...MarkdownDocx.defaultOptions,
			...options
		};
	}
	get ignoreImage() {
		return !!this.options.ignoreImage;
	}
	get ignoreFootnote() {
		return !!this.options.ignoreFootnote;
	}
	get ignoreHtml() {
		return !!this.options.ignoreHtml;
	}
	async toDocument(options) {
		this.footnotes = {};
		const section = await this.toSection();
		return new Document({
			numbering,
			styles: createDocumentStyle(),
			...this.options.document,
			...options,
			footnotes: this.footnotes,
			sections: [{ children: section }]
		});
	}
	async toSection() {
		const tokenList = tokenize(this);
		if (!this.ignoreImage) {
			const imageList = getImageTokens(tokenList);
			if (imageList.length) await this.downloadImageList(imageList);
		}
		return this.toBlocks(tokenList);
	}
	async downloadImageList(tokens) {
		const imageAdapter = this.options.imageAdapter;
		if (typeof imageAdapter !== "function") throw new Error("MarkdownDocx.imageAdapter is not a function");
		const store = this._imageStore;
		const promises = tokens.map((token) => {
			if (store.has(token.href)) return Promise.resolve(store.get(token.href));
			const cache = {};
			store.set(token.href, cache);
			return imageAdapter(token).then((item) => {
				Object.assign(cache, item);
				return cache;
			});
		});
		return Promise.all(promises);
	}
	toBlocks(tokens, attr = {}) {
		return renderBlocks(this, tokens, attr);
	}
	toTexts(tokens, attr = {}) {
		return renderTokens(this, tokens, attr);
	}
	addFootnote(id, children) {
		this.footnotes[id] = { children };
	}
	findImage(token) {
		const image = this._imageStore.get(token.href);
		if (!image) return null;
		return image;
	}
	addBlockRender(blockType, renderFn) {
		this._blockRender.set(blockType, renderFn);
	}
	addInlineRender(inlineType, renderFn) {
		this._inlineRender.set(inlineType, renderFn);
	}
	useBlockRender(block, attr) {
		const renderFn = this._blockRender.get(block.type);
		if (renderFn) return renderFn(this, block, attr);
		return null;
	}
	useInlineRender(token, attr) {
		const renderFn = this._inlineRender.get(token.type);
		if (renderFn) return renderFn(this, token, attr);
		return null;
	}
};

//#endregion
//#region src/index.ts
function markdownDocx(markdown$1, options = {}) {
	return MarkdownDocx.covert(markdown$1, options);
}

//#endregion
//#region src/adapters/browser.ts
const downloadImage = async function(token) {
	const href = token.href;
	if (!href) return null;
	try {
		const response = await fetch(href);
		if (!response.ok) return null;
		const blob = await response.blob();
		const type = getImageExtension(href, response.headers.get("content-type") || blob.type);
		if (!type) return null;
		let { width, height, image } = await loadImageSize(blob);
		let imageData = await blob.arrayBuffer();
		let imageType = type;
		if (type === "webp") {
			imageData = await convertWebp2Png(width, height, image);
			imageType = "png";
		}
		return {
			type: imageType,
			data: imageData,
			width,
			height
		};
	} catch (error) {
		console.error(`[MarkdownDocx] downloadImageError`, error);
		return null;
	}
};
async function loadImageSize(blob) {
	return new Promise((resolve, reject) => {
		const image = new Image();
		image.onload = () => {
			resolve({
				width: image.naturalWidth || image.width,
				height: image.naturalHeight || image.height,
				image
			});
			URL.revokeObjectURL(image.src);
		};
		image.onerror = (err) => {
			URL.revokeObjectURL(image.src);
			reject(/* @__PURE__ */ new Error(`Failed to load image: ${err.message || err}`));
		};
		image.src = URL.createObjectURL(blob);
	});
}
async function convertWebp2Png(width, height, image) {
	if (typeof OffscreenCanvas !== "undefined") return await convertWithOffscreenCanvas(width, height, image);
	return await convertWithRegularCanvas(width, height, image);
}
async function convertWithOffscreenCanvas(width, height, image) {
	const canvas = new OffscreenCanvas(width, height);
	const ctx = canvas.getContext("2d");
	if (!ctx) throw new Error("Failed to get canvas context for WebP conversion");
	ctx.drawImage(image, 0, 0, width, height);
	return (await canvas.convertToBlob({
		type: "image/png",
		quality: 1
	})).arrayBuffer();
}
async function convertWithRegularCanvas(width, height, image) {
	const canvas = document.createElement("canvas");
	const ctx = canvas.getContext("2d");
	if (!ctx) throw new Error(`Failed to get canvas context for WebP conversion`);
	canvas.width = width;
	canvas.height = height;
	ctx.drawImage(image, 0, 0, width, height);
	return new Promise((resolve, reject) => {
		return canvas.toBlob((blob) => blob ? resolve(blob.arrayBuffer()) : reject(/* @__PURE__ */ new Error("Failed to convert canvas to Blob")), "image/png", 1);
	});
}

//#endregion
//#region src/entry.ts
MarkdownDocx.defaultOptions.imageAdapter = downloadImage;

//#endregion
export { MarkdownDocx, Packer, markdownDocx as default, markdownDocx, styles };