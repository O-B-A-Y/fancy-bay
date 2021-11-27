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
import { toggleProposalCreationModal } from 'src/states/modal/slice';
import colors from '../../styles/colors.module.scss';
import styles from './TransferProposalCreationModal.module.scss';
import Loader from 'react-loader-spinner';
import useTreasureBayMutations from 'src/states/treasureBay/hooks/useTreasureBayMutations';
import useWeb3 from 'src/hooks/useWeb3';
import moment from 'moment';

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

const ProposalCreationModal = () => {
  const dispatch = useAppDispatch();
  const {
    data: { selectedBay },
  } = useAppSelector((state) => state.treasureBaySlice);
  const { loading, createNewTransferProposal } = useTreasureBayMutations();
  const web3 = useWeb3();
  const { formValues, handleSetFieldValue, handleResetFormValues } =
    useFormValidation({
      amount: '',
      title: '',
      description: '',
      recipient: '',
      fromToken: '',
      type: 'EXCHANGE',
      deadlineDay: 1,
    });
  const { data } = useAppSelector((state) => state.modalSlice);
  const handler = {
    AddNewBay: async () => {
      createNewTransferProposal(selectedBay.address, {
        _amount: formValues.amount,
        _debatingPeriod: `${moment()
          .add(formValues.deadlineDay, 'days')
          .unix()}`,
        _description: formValues.description,
        _recipient: formValues.recipient,
        _title: formValues.title,
      });
      handleResetFormValues();
      dispatch(toggleProposalCreationModal(false));
    },
    CloseModal: () => dispatch(toggleProposalCreationModal(false)),
  };
  return (
    <>
      <ReactModal
        isOpen={data.proposalCreation}
        onRequestClose={handler.CloseModal}
        ariaHideApp={false}
        contentLabel="ProposalCreationModal"
      >
        <div className={styles.container}>
          <div className={styles.rowItem}>
            <h3>Create a new proposal</h3>
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
              <div style={{ display: 'flex', marginBottom: '10px' }}>
                <Button
                  backgroundColor={
                    formValues.type === 'TRANSFER'
                      ? colors.dark600
                      : colors.dark800
                  }
                  color="white"
                  variant={ButtonVariant.filled}
                  size={ButtonSize.full}
                  textAlign={TextAlign.center}
                  paddingVertical={10}
                  onClick={() => handleSetFieldValue('type', 'TRANSFER')}
                >
                  Transfer
                </Button>
                <Button
                  backgroundColor={
                    formValues.type === 'EXCHANGE'
                      ? colors.dark600
                      : colors.dark800
                  }
                  color="white"
                  variant={ButtonVariant.filled}
                  size={ButtonSize.full}
                  textAlign={TextAlign.center}
                  paddingVertical={10}
                  onClick={() => handleSetFieldValue('type', 'EXCHANGE')}
                >
                  Exchange
                </Button>
              </div>
              <ReusableTextInput
                value={formValues.title}
                label="Title"
                placeholder="Enter the title"
                onValueChanged={(e) =>
                  handleSetFieldValue('title', (e.target as any).value)
                }
              />
              <ReusableTextInput
                value={formValues.description}
                label="Description"
                placeholder="Enter the proposal description"
                onValueChanged={(e) =>
                  handleSetFieldValue('description', (e.target as any).value)
                }
              />
              {formValues.type === 'TRANSFER' && (
                <ReusableTextInput
                  value={formValues.amount}
                  label={`Amount <= ${web3.utils.fromWei(
                    selectedBay.totalValueLocked,
                    'ether'
                  )} ETH`}
                  placeholder="Enter the transferring amount"
                  onValueChanged={(e) =>
                    handleSetFieldValue('amount', (e.target as any).value)
                  }
                />
              )}
              {formValues.type === 'EXCHANGE' && (
                <ReusableTextInput
                  value={formValues.amount}
                  label="From token"
                  placeholder="Enter the from token address"
                  onValueChanged={(e) =>
                    handleSetFieldValue('fromToken', (e.target as any).value)
                  }
                />
              )}
              {formValues.type === 'EXCHANGE' && (
                <ReusableTextInput
                  value={formValues.amount}
                  label="To token"
                  placeholder="Enter the from to address"
                  onValueChanged={(e) =>
                    handleSetFieldValue('fromToken', (e.target as any).value)
                  }
                />
              )}
              {formValues.type === 'TRANSFER' && (
                <ReusableTextInput
                  value={formValues.recipient}
                  label="Recipient"
                  placeholder="Enter the recipient address"
                  onValueChanged={(e) =>
                    handleSetFieldValue('recipient', (e.target as any).value)
                  }
                />
              )}
              <div style={{ display: 'flex', marginBottom: '10px' }}>
                <Button
                  backgroundColor={
                    formValues.deadlineDay === 1
                      ? colors.dark600
                      : colors.dark800
                  }
                  color="white"
                  variant={ButtonVariant.filled}
                  size={ButtonSize.full}
                  textAlign={TextAlign.center}
                  paddingVertical={10}
                  onClick={() => handleSetFieldValue('deadlineDay', 1)}
                >
                  1 day
                </Button>
                <Button
                  backgroundColor={
                    formValues.deadlineDay === 3
                      ? colors.dark600
                      : colors.dark800
                  }
                  color="white"
                  variant={ButtonVariant.filled}
                  size={ButtonSize.full}
                  textAlign={TextAlign.center}
                  paddingVertical={10}
                  onClick={() => handleSetFieldValue('deadlineDay', 3)}
                >
                  3 days
                </Button>
                <Button
                  backgroundColor={
                    formValues.deadlineDay === 5
                      ? colors.dark600
                      : colors.dark800
                  }
                  color="white"
                  variant={ButtonVariant.filled}
                  size={ButtonSize.full}
                  textAlign={TextAlign.center}
                  paddingVertical={10}
                  onClick={() => handleSetFieldValue('deadlineDay', 5)}
                >
                  5 days
                </Button>
                <Button
                  backgroundColor={
                    formValues.deadlineDay === 7
                      ? colors.dark600
                      : colors.dark800
                  }
                  color="white"
                  variant={ButtonVariant.filled}
                  size={ButtonSize.full}
                  textAlign={TextAlign.center}
                  paddingVertical={10}
                  onClick={() => handleSetFieldValue('deadlineDay', 7)}
                >
                  7 days
                </Button>
              </div>
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
                    Add new proposal{' '}
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

export default ProposalCreationModal;
