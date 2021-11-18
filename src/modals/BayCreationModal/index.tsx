import React from 'react';
import { FaPlus, FaTimes } from 'react-icons/fa';
import ReactModal from 'react-modal';
import { Button, Grid, TextInput } from 'src/components';
import GridItem from 'src/components/GridItem';
import ButtonSize from 'src/constants/buttonConstant';
import ButtonVariant from 'src/constants/buttonVariant';
import TextAlign from 'src/constants/textAlign';
import TextInputVariant from 'src/constants/textInputVariant';
import useFormValidation from 'src/hooks/useFormValidation';
import { useAppDispatch, useAppSelector } from 'src/states/hooks';
import { toggleBayCreationModal } from 'src/states/modal/slice';
import colors from '../../styles/colors.module.scss';
import styles from './BayCreationModal.module.scss';
import Loader from 'react-loader-spinner';
import useTreasureBayMutations from 'src/states/treasureBay/hooks/useTreasureBayMutations';

const ReusableTextInput = ({
  label,
  placeholder,
  onValueChanged,
  value,
}: {
  value: any;
  label: string;
  placeholder: string;
  onValueChanged: React.ChangeEventHandler<Element>;
}) => (
  <TextInput
    style={{ marginBottom: 10 }}
    label={label}
    variant={TextInputVariant.outlined}
    borderWidth={1}
    backgroundColor={colors.dark500}
    placeholder={placeholder}
    inputClassName={styles.textInput}
    value={value}
    placeholderStyle={{
      color: 'white',
    }}
    onValueChanged={onValueChanged}
  />
);

const BayCreationModal = () => {
  const dispatch = useAppDispatch();
  const { createNewTreasureBay, loading } = useTreasureBayMutations();
  const { formValues, handleSetFieldValue } = useFormValidation({
    name: '',
    limitNumberOfTreasureHunters: '',
    limitNumberOfStakeholders: '',
  });
  const { data } = useAppSelector((state) => state.modalSlice);
  const handler = {
    AddNewBay: async () => createNewTreasureBay(formValues),
    CloseModal: () => dispatch(toggleBayCreationModal(false)),
  };
  return (
    <>
      <ReactModal
        isOpen={data.bayCreation}
        onRequestClose={handler.CloseModal}
        ariaHideApp={false}
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: colors.dark800,
            color: 'white',
            border: `1px solid ${colors.dark600}`,
          },
          overlay: {
            backgroundColor: 'rgba(0,0,0,.53)',
          },
        }}
        contentLabel="BayCreationModal"
      >
        <div
          className={styles.container}
          style={{ width: 700 / 2, maxWidth: 700 / 2 }}
        >
          <div className={styles.rowItem}>
            <h3>Create new bay</h3>
            <FaTimes
              style={{ cursor: 'pointer' }}
              onClick={handler.CloseModal}
            />
          </div>
          <Grid
            cols={{
              xs: 1,
              md: 2,
              lg: 2,
            }}
            rows={{
              xs: 1,
              md: 1,
              lg: 1,
            }}
            rowGap="xs"
            colGap="md"
          >
            {/* <GridItem rowSpan={1} colSpan={1}>
            <DropzoneWithPreview />
          </GridItem> */}
            <GridItem rowSpan={1} colSpan={2}>
              <ReusableTextInput
                value={formValues.name}
                label="Name"
                placeholder="Enter your bay name"
                onValueChanged={(e) =>
                  handleSetFieldValue('name', (e.target as any).value)
                }
              />
              <ReusableTextInput
                value={formValues.limitNumberOfTreasureHunters}
                label="Capacity of treasure hunters"
                placeholder="Enter the limit number of treasure hunters"
                onValueChanged={(e) =>
                  handleSetFieldValue(
                    'limitNumberOfTreasureHunters',
                    (e.target as any).value,
                    {
                      isNumeric: true,
                    }
                  )
                }
              />
              <ReusableTextInput
                value={formValues.limitNumberOfStakeholders}
                label="Capacity of stakeholders"
                placeholder="Enter the limit number of stakeholders"
                onValueChanged={(e) =>
                  handleSetFieldValue(
                    'limitNumberOfStakeholders',
                    (e.target as any).value,
                    {
                      isNumeric: true,
                    }
                  )
                }
              />
              <Button
                backgroundColor="#303030"
                borderWidth={1.5}
                color="white"
                variant={ButtonVariant.filled}
                size={ButtonSize.full}
                textAlign={TextAlign.center}
                paddingVertical={15}
                paddingHorizontal={20}
                onClick={handler.AddNewBay}
              >
                {loading ? (
                  <div
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: '100%',
                      height: '30px',
                      display: 'flex',
                    }}
                  >
                    <Loader
                      type="Grid"
                      color="#49fdc0"
                      height={20}
                      width={20}
                    />
                  </div>
                ) : (
                  <>
                    Add new bay{' '}
                    <FaPlus style={{ fontSize: 10, marginLeft: 10 }} />
                  </>
                )}
              </Button>
            </GridItem>
          </Grid>
        </div>
      </ReactModal>
    </>
  );
};

export default BayCreationModal;
