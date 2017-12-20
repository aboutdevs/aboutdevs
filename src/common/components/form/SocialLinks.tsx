import * as React from "react";
import * as ReduxForm from "redux-form";
import { Field, FormField, FormGroup, TextBox } from "./index";
import { FaIcon } from "../FaIcon";
import { FormRow } from "./FormRow";
import { SelectSocialLink } from "./SelectSocialLink";

interface SocialLinksProps extends ReduxForm.WrappedFieldArrayProps<{}> {
}

export class SocialLinks extends React.Component<SocialLinksProps> {

    public render() {
        const {fields, meta: {error}} = this.props;
        return (
            <FormGroup label="Social links">
                <div className="field-array">
                    <ul>
                        {
                            fields.map((socialLink, index) => (
                                <li className="multi-line" key={`service-${index}`}>
                                    <div className="item">
                                        <FormRow>
                                            <Field
                                                name={`${socialLink}.website`}
                                                label={"Website"}
                                                component={FormField}
                                                innerComponent={SelectSocialLink}
                                                addOnBefore={<FaIcon icon="circle-o"/>}
                                            />
                                        </FormRow>
                                        <FormRow>
                                            <Field
                                                name={`${socialLink}.url`}
                                                label={"URL"}
                                                component={FormField}
                                                innerComponent={TextBox}
                                                addOnBefore={<FaIcon icon="link"/>}
                                            />
                                        </FormRow>
                                    </div>
                                    <div className="controls">
                                        <button
                                            disabled={index === 0}
                                            onClick={(e) => {
                                                fields.swap(index, index - 1);
                                                e.stopPropagation();
                                            }}
                                        >
                                            <i className="fa fa-caret-up"/>
                                        </button>
                                        <button
                                            disabled={fields.length === (index + 1)}
                                            onClick={(e) => {
                                                fields.swap(index, index + 1);
                                                e.stopPropagation();
                                            }}
                                        >
                                            <i className="fa fa-caret-down"/>
                                        </button>
                                        <button
                                            disabled={fields.length === 1}
                                            onClick={(e) => {
                                                fields.remove(index);
                                                e.stopPropagation();
                                            }}
                                        >
                                            <i className="fa fa-trash"/>
                                        </button>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                    <div className="field-array-button-bar">
                        <button type="button" onClick={() => fields.push({})}>
                            + Social link
                        </button>
                    </div>
                </div>
            </FormGroup>
        );
    }
}
