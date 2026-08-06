import { useRef } from "react";
import { Button, Space, Modal, message } from "antd";
import SignatureCanvas from "react-signature-canvas";

export interface SignatureInputProps {
  onSave: (signatureDataUrl: string) => void;
  onClear: () => void;
  imageURL: string | null;
  onOpenModal: () => void;
  isOpen: boolean;
  onCancel: () => void;
  label: string;
}

const SignatureInput = ({
  onSave,
  onClear,
  imageURL,
  onOpenModal,
  isOpen,
  onCancel,
  label,
}: SignatureInputProps) => {
  const sigCanvasRef = useRef<SignatureCanvas>(null);

  const handleSave = () => {
    const canvas = sigCanvasRef.current;
    if (!canvas) return;

    if (canvas.isEmpty()) {
      message.warning("Please draw your signature before saving.");
      return;
    }

    let dataUrl: string;
    try {
      dataUrl = canvas.getTrimmedCanvas().toDataURL("image/png");
    } catch (error) {
      // getTrimmedCanvas() can throw in some environments/versions (this
      // library is pinned to an alpha release for React 19 compatibility).
      // Fall back to the untrimmed canvas rather than silently failing.
      console.error(
        "Signature trimming failed, saving untrimmed canvas instead:",
        error
      );
      dataUrl = canvas.getCanvas().toDataURL("image/png");
    }

    onSave(dataUrl);
  };

  const handleClear = () => {
    if (sigCanvasRef.current) {
      sigCanvasRef.current.clear();
      onClear();
    }
  };

  return (
    <>
      <Button type="primary" onClick={onOpenModal}>
        {label}
      </Button>
      {imageURL && (
        <div style={{ marginTop: 10, textAlign: "left" }}>
          <img
            src={imageURL}
            alt="Signature"
            style={{
              width: "200px",
              height: "100px",
              border: "1px solid black",
            }}
          />
        </div>
      )}

      <Modal title="Sign Here" open={isOpen} onCancel={onCancel} footer={null}>
        <div
          style={{
            border: "1px solid black",
            padding: "10px",
            background: "#fff",
          }}
        >
          <SignatureCanvas
            ref={sigCanvasRef}
            canvasProps={{
              className: "signatureCanvas",
              width: 400,
              height: 120,
            }}
          />
        </div>
        <Space style={{ marginTop: 10 }}>
          <Button onClick={handleSave} type="primary">
            Save Signature
          </Button>
          <Button onClick={handleClear} danger>
            Clear
          </Button>
        </Space>
      </Modal>
    </>
  );
};

export default SignatureInput;
