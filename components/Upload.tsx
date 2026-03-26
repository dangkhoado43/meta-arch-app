import {
    ALLOWED_IMAGE_TYPES,
    FAKE_PROGRESS_LIMIT,
    MAX_PROGRESS,
    MAXIMUM_FILE_SIZE,
    PROCESSING_DELAY_MS,
    PROGRESS_INCREMENT,
    PROGRESS_INTERVAL_MS,
    REDIRECT_DELAY_MS,
} from "lib/constants";
import { CheckCircle2, ImageIcon, UploadIcon } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useOutletContext } from "react-router";

interface UploadProps {
    onComplete?: (base64Data: string) => void;
}

const Upload = ({ onComplete }: UploadProps) => {
    const [file, setFile] = useState<File | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [progress, setProgress] = useState(0);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const processingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const redirectTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const { isSignedIn, signIn } = useOutletContext<AuthContext>();

    useEffect(() => {
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }

            if (processingTimeoutRef.current) {
                clearTimeout(processingTimeoutRef.current);
                processingTimeoutRef.current = null;
            }

            if (redirectTimeoutRef.current) {
                clearTimeout(redirectTimeoutRef.current);
                redirectTimeoutRef.current = null;
            }
        };
    }, []);

    const processFile = useCallback(
        (file: File) => {
            if (!isSignedIn) return;

            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }

            if (processingTimeoutRef.current) {
                clearTimeout(processingTimeoutRef.current);
            }

            if (redirectTimeoutRef.current) {
                clearTimeout(redirectTimeoutRef.current);
            }

            setFile(file);
            setProgress(0);

            const reader = new FileReader();
            reader.onerror = () => {
                setFile(null);
                setProgress(0);
            };
            reader.onloadend = () => {
                if (!reader.result) return;
                const base64Data = reader.result as string;

                intervalRef.current = setInterval(() => {
                    setProgress((prev) => {
                        const next = prev + PROGRESS_INCREMENT;

                        if (next >= FAKE_PROGRESS_LIMIT) {
                            return FAKE_PROGRESS_LIMIT;
                        }

                        return next;
                    });
                }, PROGRESS_INTERVAL_MS);

                processingTimeoutRef.current = setTimeout(() => {
                    if (intervalRef.current) {
                        clearInterval(intervalRef.current);
                        intervalRef.current = null;
                    }

                    setProgress(MAX_PROGRESS);

                    redirectTimeoutRef.current = setTimeout(() => {
                        onComplete?.(base64Data);
                        redirectTimeoutRef.current = null;
                    }, REDIRECT_DELAY_MS);
                }, PROCESSING_DELAY_MS);
            };
            reader.readAsDataURL(file);
        },
        [isSignedIn, onComplete],
    );

    const handleClickUpload = async () => {
        if (!isSignedIn) {
            try {
                await signIn();
            } catch (e) {
                console.error("Puter sign in failed:", e);
            }
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        if (!isSignedIn) return;
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);

        if (!isSignedIn) return;

        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile && ALLOWED_IMAGE_TYPES.includes(droppedFile.type)) {
            processFile(droppedFile);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!isSignedIn) return;

        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            processFile(selectedFile);
        }
    };

    return (
        <div className="upload">
            {!file ? (
                <div
                    className={`dropzone ${isDragging ? "is-dragging" : ""}`}
                    onClick={handleClickUpload}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                >
                    <input
                        type="file"
                        className="drop-input"
                        accept=".jpg,.jpeg,.png"
                        onChange={handleChange}
                    />

                    <div className="drop-content">
                        <div className="drop-icon">
                            <UploadIcon size={20} />
                        </div>
                        <p>
                            {isSignedIn
                                ? "Click to upload or just drag and drop"
                                : "Sign in or sign up with Puter to upload"}
                        </p>
                        {isSignedIn && (
                            <p className="help">
                                Maximum file size {MAXIMUM_FILE_SIZE}MB.
                            </p>
                        )}
                    </div>
                </div>
            ) : (
                <div className="upload-status">
                    <div className="status-content">
                        <div className="status-icon">
                            {progress === 100 ? (
                                <CheckCircle2 className="check" />
                            ) : (
                                <ImageIcon className="image" />
                            )}
                        </div>

                        <h3>{file.name}</h3>

                        <div className="progress">
                            <div
                                className="bar"
                                style={{ width: `${progress}%` }}
                            />

                            <p className="status-text">
                                {progress < 100
                                    ? "Analyzing Floor Plan..."
                                    : "Redirecting..."}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Upload;
