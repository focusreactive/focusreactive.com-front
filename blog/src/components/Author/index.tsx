import React from "react";
import styled from "@emotion/styled";
import Link from "@docusaurus/Link";
import clsx from "clsx";
import styles from "./styles.module.css";
import { SanityApiAuthor } from "@site/src/types";

type AvatarProps = {
	avatarSize?: "small" | "big";
};

const Avatar = styled.img<AvatarProps>`
	${({ avatarSize }) =>
		avatarSize === "big"
			? "width: 80px; height 80px;"
			: "width: 45px; height 45px;"}
	border-radius: 50%;
	flex-shrink: 0;
	aspect-ratio: 1/1;
`;

type AuthorProps = AvatarProps &
	SanityApiAuthor & {
		isItSignature?: boolean;
	};

const Author = ({
	name,
	id,
	picture,
	avatarSize,
	isItSignature,
	about,
}: AuthorProps) => (
	<div className={styles.author}>
		<div className={styles["author__img-wrap"]}>
			<Avatar
				src={`${picture}?w=${avatarSize === "big" ? "160" : "90"}`}
				alt={name}
				avatarSize={avatarSize}
			/>
		</div>
		<div className={styles.author__desc}>
			<Link to={`/blog/author/${id}`}>
				<p
					className={
						isItSignature
							? clsx(styles.author__name, styles.author__name__signature)
							: styles.author__name
					}
				>
					{name}
				</p>
			</Link>
			<p
				className={
					isItSignature
						? clsx(
								styles.author__company,
								styles.author__company__signature
						  )
						: styles.author__company
				}
			>{`${about}`}</p>
		</div>
	</div>
);

export default Author;
