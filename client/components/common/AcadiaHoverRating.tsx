import { Box, Rating } from "@mui/material";
import React from "react";
import StarIcon from '@mui/icons-material/Star';

interface AcadiaHoverRatingProps {
    value: number | null;
    setValue?: React.Dispatch<React.SetStateAction<number | null>>;
    readOnly?: boolean;
}

const AcadiaHoverRating: React.FC<AcadiaHoverRatingProps> = (props) => {
    const { value, setValue, readOnly } = props;

    const onChange = React.useCallback((_event: React.SyntheticEvent<Element, Event>, newValue: number | null) => {
        if (setValue) {
            setValue(newValue);
        }
    }, [setValue]);

    return (
        <Rating
            name="hover-feedback"
            value={value}
            precision={0.5}
            onChange={onChange}
            readOnly={readOnly}
            emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
        />
    );
};

export default AcadiaHoverRating;