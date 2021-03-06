import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import TextArea from "./textarea";
import SelectBox from "./select-box";
import CheckBox from "./check-box";
import FileUpload from "./file-upload";

class Form extends Component {
    generalErrorMessage = "There was an error while executing your request, please try again"

    state = {
        data: {},
        errors: {},
        inSubmitProcess: false
    };

    validate = () => {
        const options = { abortEarly: false, allowUnknown: true };
        const { error } = Joi.validate(this.state.data, this.validationSchema, options);
        if (!error) return null;

        const errors = {};
        for (let item of error.details) errors[item.path[0]] = item.message;
        return errors;
    };

    validateProperty = ({ name, value }) => {
        const obj = { [name]: value };
        const schema = { [name]: this.validationSchema[name] };
        const { error } = Joi.validate(obj, schema);
        return error ? error.details[0].message : null;
    };

    handleSubmit = e => {

        e.preventDefault();

        const errors = this.validate();
        this.setState({ errors: errors || {} });
        if (errors) return;

        this.submit();

    };

    handleChange = async ({ currentTarget: input }) => {
        const errors = { ...this.state.errors };
        const errorMessage = this.validateProperty(input);
        if (errorMessage) {
            errors[input.name] = errorMessage;
        }
        else {
            delete errors[input.name];
        }

        const data = { ...this.state.data };
        data[input.name] = input.value;

        await this.setState({ data, errors });

        if (this.additionalInputChangeHandling) {
            this.additionalInputChangeHandling(input)
        }
    };


    showGeneralErrorMessage() {
        const errors = { ...this.state.errors }
        errors.general = this.generalErrorMessage;
        this.setState({ errors })
    }

    handleCancel = e => {
        e.preventDefault();
        this.props.history.goBack();
    };

    handleCheckBoxChange = e => {
        const { data } = this.state;
        data[e.target.name] = e.target.checked;

        this.setState({ data });

        if (this.additionalInputChangeHandling) {
            this.additionalInputChangeHandling(e.target);
        }
    }

    renderButton(title) {
        return (
            <button disabled={this.validate()} className="btn btn-primary">
                {title}
            </button>
        );
    }

    renderCancelButton(title) {
        return (
            <button className="btn btn-secondary" onClick={this.handleCancel}>
                {title}
            </button>
        );
    }

    renderInput(required, name, title, type, className, placeholder) {
        const { data, errors } = this.state;

        return (
            <Input
                required={required}
                type={type}
                name={name}
                value={data[name]}
                title={title}
                onChange={this.handleChange}
                errorMessage={errors[name]}
                placeholder={placeholder}
                className={className}
            />
        );
    }

    renderTextarea(required, name, title, rows, cols, className, placeholder) {
        const { data, errors } = this.state;

        return (
            <TextArea
                required={required}
                name={name}
                value={data[name]}
                title={title}
                rows={rows}
                cols={cols}
                onChange={this.handleChange}
                errorMessage={errors[name]}
                placeholder={placeholder}
                className={className}
            />
        );
    }

    renderSelectBox(required, name, title, options, noSelectionTitle, className, defaultSelectedValue) {
        const { data, errors } = this.state;

        return (
            <SelectBox
                required={required}
                name={name}
                value={data[name]}
                title={title}
                defaultSelectedValue={defaultSelectedValue}
                options={options}
                noSelectionTitle={noSelectionTitle}
                onChange={this.handleChange}
                errorMessage={errors[name]}
                className={className}
            />
        );
    }

    renderCheckBox(name, title, className) {
        const { data } = this.state;

        return (
            <CheckBox
                name={name}
                checked={data[name]}
                title={title}
                onChange={this.handleCheckBoxChange}
                className={className}
            />
        );
    }


    renderFileUpload(required, name, title, accept, className) {
        const { data, errors } = this.state;

        return (
            <FileUpload
                required={required}
                name={name}
                value={data[name]}
                title={title}
                accept={accept}
                onChange={this.handleChange}
                errorMessage={errors[name]}
                className={className}
            />
        );
    }

    onItemFileNameChange(e) {

    }




}

export default Form;