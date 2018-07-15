/* globals document, localStorage */
import React, { Component } from 'react';

import Code from './components/Code.jsx';

import { KINDS, Token } from '../src/Token.mjs';
import evaluate from '../src/evaluate.mjs';
import { run, reset } from '../index.mjs';

import styles from './App.css';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            code: localStorage.getItem('code') || '# "start ispish code"',
            log: [],
            showLog: true,
            showCanvas: true,
        };
        this.onChange = this.onChange.bind(this);
        this.runCode = this.runCode.bind(this);
        this.toggleLog = this.toggleLog.bind(this);
        this.toggleCanvas = this.toggleCanvas.bind(this);
    }
    toggleLog() {
        this.setState(state => ({
            showLog: !state.showLog,
        }));
    }

    toggleCanvas() {
        this.setState(state => ({
            showCanvas: !state.showCanvas,
        }));
    }

    onChange(newValue) {
        // this acts as our "save" mechanism; "code" is the
        // default workspace of sorts; we don't store state
        // though until explicitly asked.
        localStorage.setItem('code', newValue);
        this.setState({
            code: newValue,
        });
    }
    runCode() {
        const { code } = this.state;

        const scope = {
            __print__: (...args) =>
                this.setState(state => ({
                    log: [...state.log, args.join(' ')],
                })),
        };

        try {
            reset();
            let r = run(code, scope);
            if (r !== undefined) {
                const printExpr = new Token({
                    kind: KINDS.EXPR,
                    value: new Token({
                        kind: KINDS.WORD,
                        value: 'PRINTCODE',
                    }),
                    tokens: [r],
                });

                r = evaluate(printExpr, scope);
            } else {
                r = '(no return)';
            }
        } catch (err) {
            scope.__print__(err.message);
        }
    }

    render() {
        const {
            code, log, showLog, showCanvas,
        } = this.state;
        const [width, height] = [window.innerWidth / 2, window.innerHeight - 128];
        return (
            <div className={styles.App}>
                <div className={styles.appbar}>
                    <div style={{ margin: 'auto 0' }}>ispish playground</div>
                </div>
                <div className={styles.row}>
                    <div className={styles.column} style={{ flex: `0 0 ${width}px` }}>
                        <div className={styles.toolbar}>
                            <button onClick={this.runCode}>Run</button>
                        </div>
                        <Code value={code} onChange={this.onChange} width={width} height={height} />
                    </div>
                    <div className={styles.column} style={{overflow: 'auto', backgroundColor: '#1E1E1E'}}>
                        <div className={styles.toolbar}>
                            <button onClick={this.toggleLog}>Log</button>
                            <button onClick={this.toggleCanvas}>Canvas</button>
                        </div>
                        {showLog && <pre className={styles.log}>{log.map(entry => <div>{entry}</div>)}</pre>}
                        {showCanvas && (
                            <canvas
                                id="graphics"
                                ref={(el) => {
                                    this.canvas = el;
                                }}
                            />
                        )}
                    </div>
                </div>
            </div>
        );
    }
}
