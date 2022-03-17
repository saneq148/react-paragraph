import {
  FC,
  useState,
  forwardRef,
  useRef,
  Ref,
  useImperativeHandle,
} from "react";
import { Button, Segment, Label, Modal, Form } from "semantic-ui-react";
import { ITextCard } from "../../types/card";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import "./quill.css";

// TODO GET IN HELPERS

function selectSomeProperties(ENTRY: any, WHITELIST: string[]) {
  return Object.keys(ENTRY).reduce(function (obj: any, k: string) {
    if (WHITELIST.includes(k)) {
      obj[k] = ENTRY[k];
    }
    return obj;
  }, {});
}

interface RefObject {
  getResult: () => any;
}

const schema = yup
  .object({
    title: yup.string().required(),
    content: yup.string().required(),
  })
  .required();

//   : {
//   card: ITextCard | null;
//   setEditedCard: (card: ITextCard) => void;
// }: any

const EditTextCardModalContent: FC<any> = forwardRef(
  (
    {
      card,
      setEditedCard,
    }: {
      card: ITextCard | null;
      setEditedCard: (card: ITextCard) => void;
    },
    ref: Ref<RefObject>
  ) => {
    const defaultValues = selectSomeProperties(card, [
      "title",
      "subtitle",
      "content",
    ]);

    const {
      register,
      setValue,
      trigger,
      handleSubmit,
      getValues,
      control,
      formState: { errors },
    } = useForm({
      resolver: yupResolver(schema),
      defaultValues,
    });

    // The component instance will be extended
    // with whatever you return from the callback passed
    // as the second argument
    useImperativeHandle(ref, () => ({
      getResult() {
        // alert("getAlert from Child");
        return getValues();
      },
    }));

    const [editorVal, setEditorVal] = useState("");

    const bounds = useRef(null);
    console.log("🚀 ~ file: index.tsx ~ line 89 ~ bounds", bounds);

    return (
      <Modal.Description>
        <pre>{JSON.stringify(getValues(), null, 2)}</pre>
        <Form>
          <Controller
            control={control}
            name="title"
            render={({
              field: { onChange, onBlur, value },
              fieldState,
            }: any) => (
              <Form.Input
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                label="title"
                error={
                  fieldState?.error?.message && {
                    content: fieldState.error.message,
                    pointing: "below",
                  }
                }
              />
            )}
          />
          <Segment style={{ padding: "2px 0 0 0" }}>
            <Label attached="top">Subtitle</Label>
            <div ref={bounds}>
              {bounds.current && (
                <>
                  <ReactQuill
                    className="one-line"
                    onChange={(content) => {
                      setEditorVal(content);
                      setValue("subtitle", content);
                      trigger();
                    }}
                    theme={"bubble"}
                    defaultValue={getValues("subtitle")}
                    bounds={(bounds.current && bounds.current) || document.body}
                  />
                  <input
                    type="hidden"
                    name="content"
                    id="content"
                    value={editorVal}
                    onInput={(e) => {
                      register("content").onChange(e);
                    }}
                  />
                </>
              )}
            </div>
          </Segment>
          <Segment style={{ padding: "2px 0 0 0" }} basic>
            <Label attached="top">Content</Label>
            <ReactQuill
              className="full"
              onChange={(content) => {
                setEditorVal(content);
                setValue("content", content);
                trigger();
              }}
              modules={{
                toolbar: [
                  [{ font: [] }, { size: ["huge", false, "large", "small"] }],
                  ["bold", "italic", "underline", "strike"],
                  [{ color: [] }, { background: [] }],
                  [
                    { header: "1" },
                    { header: "2" },
                    "blockquote",
                    "code-block",
                  ],
                  [
                    { list: "ordered" },
                    { list: "bullet" },
                    { indent: "-1" },
                    { indent: "+1" },
                  ],
                  ["direction", { align: [] }],
                  ["link", "image", "video", "formula"],
                  ["clean"],
                ],
              }}
              defaultValue={getValues("content")}
            />
            <input
              type="hidden"
              name="content"
              id="content"
              value={editorVal}
              onInput={(e) => {
                register("content").onChange(e);
              }}
            />
          </Segment>
        </Form>
      </Modal.Description>
    );
  }
);

interface IEditCardModal {
  card: ITextCard | null;
  onCancel: () => any;
  onSave: (card: ITextCard) => void;
}

const EditCardModal: FC<IEditCardModal> = ({ card, onCancel, onSave }) => {
  const [editedCard, setEditedCard] = useState<ITextCard | null>(card);

  const childRef = useRef<RefObject>(null);

  const testFunc = () => {
    const test = childRef.current?.getResult();
    console.log("🚀 ~ file: index.tsx ~ line 158 ~ testFunc ~ test", test);
    onSave({ ...card, ...test });
  };

  return (
    <Modal onClose={onCancel} open={Boolean(card)}>
      <Modal.Header>Edit</Modal.Header>
      <Modal.Content>
        <EditTextCardModalContent
          card={card}
          setEditedCard={(card: ITextCard) => {
            setEditedCard(card);
          }}
          ref={childRef}
        />
      </Modal.Content>
      <Modal.Actions>
        <Button color="red" content="Nope" onClick={onCancel} />
        <Button color="blue" content="test" onClick={testFunc} />
        <Button
          content="Yep, that's me"
          labelPosition="right"
          icon="checkmark"
          onClick={testFunc}
          positive
        />
      </Modal.Actions>
    </Modal>
  );
};

export { EditCardModal };
