import React, { Component } from 'react';
import { Button, Row, Col, Form, Badge } from 'react-bootstrap';

import htmlEntities from '../HtmlEntities';

import './TextEditor.css';

class TextEditor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            normalText: '',
            htmlText: '',
            javaText: '',
            charCount: 0,
            wordCount: 0
        };
    }

    encodeHTML = (s) => {
        return s.replace(/[\u00A0-\u9999<>\&]/gim, i =>
            htmlEntities[i] === undefined ? '&#' + i.charCodeAt(0) : htmlEntities[i]
        );
    }

    encodeJava = (s) => {
        return s.replace(/[\u00A0-\u9999<>\&]/gim, i =>
            '\\u' + i.charCodeAt(0).toString(16).toUpperCase().padStart(4, '0')
        );
    }

    updateText = (event) => {
        let text = event.target.value.trim();
        this.setState({
            normalText: event.target.value,
            htmlText: this.encodeHTML(text),
            javaText: this.encodeJava(text),
            charCount: text.length,
            wordCount: text.length == 0 ? 0 : text.match(/\S+/g).length
        });
    }

    toSentenceCase = (event) => {
        let text = this.state.normalText.toLowerCase();
        if (text.length != 0) {
            text = text.charAt(0).toUpperCase() + text.slice(1);
        }

        this.setState({
            normalText: text,
            htmlText: this.encodeHTML(text),
            javaText: this.encodeJava(text)
        });
    }

    toLowerCase = (event) => {
        let text = this.state.normalText.toLowerCase();
        this.setState({
            normalText: text,
            htmlText: this.encodeHTML(text),
            javaText: this.encodeJava(text)
        });
    }

    toUpperCase = (event) => {
        let text = this.state.normalText.toUpperCase();
        this.setState({
            normalText: text,
            htmlText: this.encodeHTML(text),
            javaText: this.encodeJava(text)
        });
    }

    toCapitalizedCase = (event) => {
        let text = this.state.normalText.toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');

        this.setState({
            normalText: text,
            htmlText: this.encodeHTML(text),
            javaText: this.encodeJava(text)
        });
    }

    copyToClipboard = (text) => {
        let textArea = document.createElement("textarea");
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
    }

    copyHTMLToClipboard = (event) => {
        this.copyToClipboard(this.state.htmlText);
    }

    copyJavaToClipboard = (event) => {
        this.copyToClipboard(this.state.javaText);
    }

    render() {
        return (
            <div>
                <Row>
                    <Col>
                        <div className="textarea-container">
                            <Form.Control as="textarea" rows="7" placeholder="Write here..."
                                value={this.state.normalText}
                                onChange={this.updateText} />
                            <Badge variant="secondary">
                                Character Count: {this.state.charCount} &nbsp;|&nbsp; Word Count: {this.state.wordCount}
                            </Badge>
                        </div>
                    </Col>
                </Row>
                <Row className="buttons-row">
                    <Col>
                        <Button variant="primary" onClick={this.toSentenceCase}>Sentence case</Button>
                        <Button variant="primary" onClick={this.toLowerCase}>lower case</Button>
                        <Button variant="primary" onClick={this.toUpperCase}>UPPER CASE</Button>
                        <Button variant="primary" onClick={this.toCapitalizedCase}>Capitalized Case</Button>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h4>HTML/XML</h4>
                        <div className="textarea-container">
                            <Button variant="secondary" onClick={this.copyHTMLToClipboard}>Copy</Button>
                            <Form.Control as="textarea" rows="7" placeholder="Write here..." readOnly={true}
                                value={this.state.htmlText} />
                        </div>
                    </Col>
                    <Col>
                        <h4>JS/Java/C</h4>
                        <div className="textarea-container">
                            <Form.Control as="textarea" rows="7" placeholder="Write here..." readOnly={true}
                                value={this.state.javaText} />
                            <Button variant="secondary" onClick={this.copyJavaToClipboard}>Copy</Button>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }

}

export default TextEditor;