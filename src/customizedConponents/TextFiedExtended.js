import PropTypes from 'prop-types';

// material-ui
import { TextField, InputAdornment } from '@mui/material';

const TextFieldExtended = ({ captionLabel, error, iconPrimary, helperText, placeholder, name, value, onChange, variant }) => {
    const IconPrimary = iconPrimary;
    return (
        <TextField
            fullWidth
            label={captionLabel}
            value={value}
            onChange={onChange}
            name={name}
            InputProps={{
                startAdornment: (
                    <>
                        {IconPrimary && (
                            <InputAdornment position="start">
                                <IconPrimary />
                            </InputAdornment>
                        )}
                    </>
                )
            }}
            variant={variant}
            placeholder={placeholder}
            error={error}
            helperText={helperText}
        />
    );
};
TextFieldExtended.propTypes = {
    captionLabel: PropTypes.string,
    iconPrimary: PropTypes.object,
    placeholder: PropTypes.string,
    helperText: PropTypes.string,
    value: PropTypes.any,
    name: PropTypes.string,
    variant: PropTypes.string,
    error: PropTypes.bool,
    onChange: PropTypes.func.isRequired
};
export default TextFieldExtended;